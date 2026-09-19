import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

interface NotesPanelProps {
  onPlayClick?: () => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ onPlayClick }) => {
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState<'SAVED' | 'SAVING...'>('SAVED');

  useEffect(() => {
    storageService.getNotes().then((saved) => setNotes(saved));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(val);
    setSaveStatus('SAVING...');
    storageService.saveNotes(val).then(() => {
      setTimeout(() => setSaveStatus('SAVED'), 400);
    });
  };

  const handleManualSave = () => {
    onPlayClick?.();
    setSaveStatus('SAVING...');
    storageService.saveNotes(notes).then(() => {
      setTimeout(() => setSaveStatus('SAVED'), 300);
    });
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    onPlayClick?.();
    const textarea = document.getElementById('notes-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);
    const replacement = `${prefix}${selectedText || 'Text'}${suffix}`;

    const updated = notes.substring(0, start) + replacement + notes.substring(end);
    setNotes(updated);
    storageService.saveNotes(updated);
  };

  return (
    <div className="bg-gradient-to-b from-[#111318] via-[#101216] to-[#0c0d11] border border-[#1b1e26] rounded-lg p-3 shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-1.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_5px_#ef4444]" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#dedad0] uppercase">
            LOCAL NOTES
          </span>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 bg-[#0b0c0f] border border-[#181b22] rounded p-0.5">
          <button
            onClick={() => insertFormatting('**', '**')}
            className="w-4 h-4 text-[9px] font-mono font-bold text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => insertFormatting('<u>', '</u>')}
            className="w-4 h-4 text-[9px] font-mono underline text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Underline"
          >
            U
          </button>
          <button
            onClick={() => insertFormatting('~', '~')}
            className="w-4 h-4 text-[9px] font-mono line-through text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Strikethrough"
          >
            S
          </button>
          <button
            onClick={() => insertFormatting('• ')}
            className="w-4 h-4 text-[9px] font-mono text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Bullet point"
          >
            •
          </button>
        </div>

        <span className="text-[8px] font-mono tracking-widest text-[#5c6374] uppercase">
          LOCAL
        </span>
      </div>

      {/* Editable Notes Textarea */}
      <div className="relative flex-1 my-1 min-h-0">
        <textarea
          id="notes-textarea"
          value={notes}
          onChange={handleChange}
          placeholder="Enter notes..."
          className="w-full h-full bg-[#090a0d] border border-[#1b1e26] rounded p-2.5 text-xs font-mono text-[#dedad0] leading-relaxed resize-none focus:outline-none focus:border-[#2f3442] transition-colors"
        />
        <div className="absolute bottom-1.5 left-2.5 text-[7px] font-mono tracking-widest text-[#414756] uppercase select-none pointer-events-none">
          STORED ON THIS BROWSER
        </div>
      </div>

      {/* Footer Controls: Save Status & SAVE Button */}
      <div className="flex items-center justify-between pt-1.5 border-t border-[#181b22] shrink-0">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${saveStatus === 'SAVED' ? 'bg-[#22c55e] glow-green' : 'bg-[#f59e0b] animate-ping'}`} />
          <span className="text-[8px] font-mono tracking-widest text-[#22c55e] uppercase">
            {saveStatus}
          </span>
        </div>

        <button
          onClick={handleManualSave}
          className="px-3 py-1 border border-[#2a2e39] bg-[#12141a] hover:bg-[#181b22] rounded text-[9px] font-mono font-bold tracking-widest text-[#dedad0] uppercase hover:border-[#3b4150] transition-all active:scale-95"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};
