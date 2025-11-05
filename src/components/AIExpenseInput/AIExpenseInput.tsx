import { useState, useRef, useEffect } from 'react';
import { usePermission } from '../../hooks/usePermission';
import { Button } from '../Button';
import styles from './AIExpenseInput.module.scss';

interface AIExpenseInputProps {
  onSubmit: (message: string, audioBlob?: Blob) => void;
  isLoading?: boolean;
}

/**
 * AI Expense Input Component
 * Allows users to input expenses via text or audio message
 * AI will process and categorize the expense automatically
 */
export const AIExpenseInput = ({ onSubmit, isLoading = false }: AIExpenseInputProps) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const { hasPermission } = usePermission();
  const canAddExpense = hasPermission('canAddExpense');

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Mikrofonga kirish xatosi. Ruxsat berilganligini tekshiring.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Cancel recording
  const cancelRecording = () => {
    stopRecording();
    setAudioBlob(null);
    setRecordingTime(0);
  };

  // Format recording time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle submit
  const handleSubmit = () => {
    if (!canAddExpense) {
      alert('Sizda xarajat qo\'shish huquqi yo\'q');
      return;
    }

    if (message.trim() || audioBlob) {
      onSubmit(message.trim(), audioBlob || undefined);
      setMessage('');
      setAudioBlob(null);
      setRecordingTime(0);
    }
  };

  if (!canAddExpense) {
    return (
      <div className={styles.noPermission}>
        <p>Sizda xarajat qo'shish huquqi yo'q</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>AI yordamida xarajat qo'shish</h3>
      <p className={styles.subtitle}>
        Xarajat haqida matn yoki audio xabar yuboring. AI avtomatik tahlil qiladi.
      </p>

      <div className={styles.inputSection}>
        {/* Text Input */}
        <div className={styles.textInput}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Masalan: 'Bugun nonushta uchun 50,000 so'm sarfladim' yoki 'Ofis uchun qog'oz sotib oldim - 120,000 so'm'"
            className={styles.textarea}
            rows={4}
            disabled={isRecording || isLoading}
          />
        </div>

        {/* Audio Recording Section */}
        <div className={styles.audioSection}>
          {!isRecording && !audioBlob && (
            <Button
              onClick={startRecording}
              variant="secondary"
              disabled={isLoading}
              className={styles.recordButton}
            >
              <span className={styles.micIcon}>🎤</span>
              Audio yozish
            </Button>
          )}

          {isRecording && (
            <div className={styles.recordingControls}>
              <div className={styles.recordingIndicator}>
                <span className={styles.recordingDot}></span>
                <span className={styles.recordingTime}>{formatTime(recordingTime)}</span>
              </div>
              <div className={styles.recordingButtons}>
                <Button onClick={stopRecording} variant="primary" size="small">
                  To'xtatish
                </Button>
                <Button onClick={cancelRecording} variant="secondary" size="small">
                  Bekor qilish
                </Button>
              </div>
            </div>
          )}

          {audioBlob && !isRecording && (
            <div className={styles.audioPreview}>
              <div className={styles.audioInfo}>
                <span className={styles.audioIcon}>🎵</span>
                <span>Audio yozildi ({formatTime(recordingTime)})</span>
              </div>
              <Button onClick={cancelRecording} variant="secondary" size="small">
                O'chirish
              </Button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={(!message.trim() && !audioBlob) || isLoading}
          isLoading={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'AI tahlil qilmoqda...' : 'Yuborish'}
        </Button>
      </div>

      {/* Examples */}
      <div className={styles.examples}>
        <p className={styles.examplesTitle}>Misol xabarlar:</p>
        <ul className={styles.examplesList}>
          <li>"Tushlik uchun 45,000 so'm sarfladim"</li>
          <li>"Taksi haqi - 30,000 so'm, Chilonzor tumani"</li>
          <li>"Yangi klaviatura sotib oldim 350,000 so'mga"</li>
          <li>"Ofis uchun qahva va choy - 180,000 so'm"</li>
        </ul>
      </div>
    </div>
  );
};
