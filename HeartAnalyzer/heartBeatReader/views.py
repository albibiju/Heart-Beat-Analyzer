# views.py

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import firebase_admin
from firebase_admin import credentials
import numpy as np
from firebase_admin import db
import biosppy
import matplotlib.pyplot as plt
from scipy.signal import find_peaks
import neurokit2 as nk

if not firebase_admin._apps:
    cred = credentials.Certificate('C:\\Users\\SANJAI\\OneDrive\\Documents\\Mini Project\\HeartAnalyzer\\heart-beat-analysis-firebase-adminsdk-fm9vo-9a5dd60ca7.json')

    firebase_admin.initialize_app(cred, {'databaseURL': "https://heart-beat-analysis-default-rtdb.firebaseio.com"})

@csrf_exempt
def process_ecg_data(request):
    
    ecg_data_ref = firebase_admin.db.reference('/ecgData')
    ecg_values = ecg_data_ref.child('ecgValue').get()
    timestamps = ecg_data_ref.child('timeStamp').get()

    ecg_signal = np.array(ecg_values)
    ecg_time = np.array(timestamps)
# Detect R-peaks
    out = biosppy.signals.ecg.hamilton_segmenter(ecg_signal, sampling_rate=100)
    allPeak, _ = find_peaks(ecg_signal, height=0.1)
    
    r_peaks = out['rpeaks']
    
# Detect remaining peaks 
    s_wave_peaks = []
    t_wave_peaks = []
    p_wave_peak = []
    q_wave_peak = []
    for i in allPeak:
        s_peak = np.argmin(ecg_signal[i : i + 100])
        if s_wave_peaks and s_wave_peaks[-1] != i + s_peak:
            s_wave_peaks.append(i+s_peak)
        elif not s_wave_peaks:
            s_wave_peaks.append(i + s_peak)
    for i in s_wave_peaks:
        t_peak = np.argmax(ecg_signal[i: i + 50])
        if t_wave_peaks and t_wave_peaks[-1] != i + t_peak:
            t_wave_peaks.append(i + t_peak)
        elif not t_wave_peaks:
            t_wave_peaks.append(i + t_peak)
    for i in range(len(r_peaks)-1):
        p_peak = np.argmax(ecg_signal[t_wave_peaks[i]+20:r_peaks[i+1]-3])
        p_wave_peak.append(t_wave_peaks[i]+20 +p_peak)
    for i in range(len(r_peaks)-1):
        q_peak = np.argmin(ecg_signal[p_wave_peak[i]:r_peaks[i+1]])
        q_wave_peak.append(p_wave_peak[i]+q_peak)
            
    
    p_peak_values = ecg_signal[p_wave_peak]
    q_peak_values = ecg_signal[q_wave_peak]
    r_peak_values = ecg_signal[r_peaks]
    s_peak_values = ecg_signal[s_wave_peaks]
    t_peak_values = ecg_signal[t_wave_peaks]


    rr_intervals = np.diff(r_peaks)
    p_intervals = np.diff(p_wave_peak)
    q_intervals = np.diff(q_wave_peak)

    r_interval_avg = np.average(rr_intervals)
    p_interval_avg = np.average(p_intervals)
    q_interval_avg = np.average(q_intervals)

# QRS duration
    qrs_duration = []
    s_wave_time = ecg_time[s_wave_peaks]
    q_wave_time = ecg_time[q_wave_peak]

    # for i in s_wave_time:
        # qrs = s_wave_time[i]-q_wave_time[i]
    #     qrs_duration.append(qrs)
    # print(qrs_duration)
    # # print(ecg_values)
    # print(s_peak_values)
    # print(t_peak_values)
    # print(p_peak_values)
    # print(q_peak_values)
    # print(r_peaks)
    # print(rr_intervals)
    # print(r_interval_avg)
    # print(p_intervals)
    # print(p_interval_avg)
    # print(q_intervals)
    # print(q_interval_avg)
    print(s_wave_time)
    # print(q_wave_time)
    
    # Graph plotting 

    plt.figure(figsize=(12, 6))
    plt.plot( ecg_signal, label="ECG Signal")
    plt.plot(r_peaks, ecg_signal[r_peaks], "ro", label="R-peaks")
    plt.plot(s_wave_peaks, ecg_signal[s_wave_peaks], "go", label="s-peaks")
    plt.plot(t_wave_peaks, ecg_signal[t_wave_peaks], "bo", label="t-peaks")
    plt.plot(p_wave_peak, ecg_signal[p_wave_peak], "ko", label="p-peaks")
    plt.plot(q_wave_peak, ecg_signal[q_wave_peak], "mo", label="Q-peaks")
    plt.xlabel("Sample Number")
    plt.ylabel("Amplitude")
    plt.legend()
    plt.grid()
    plt.title("ECG Signal with R-peaks")
    plt.show()

    return HttpResponse("Data processing is complete")
       