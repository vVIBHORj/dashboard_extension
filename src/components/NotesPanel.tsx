import React, { useState, useEffect, useRef } from 'react';
import { storageService } from '../services/storageService';

interface NotesPanelProps {
  onPlayClick?: () => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ onPlayClick }) => {
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState<'SAVED' | 'SAVING...'>('SAVED');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Automatic bullet insertion on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { selectionStart, selectionEnd, value } = textarea;
      const textBefore = value.substring(0, selectionStart);
      const lastNewline = textBefore.lastIndexOf('\n');
      const currentLine = textBefore.substring(lastNewline + 1);

      // Check if current line starts with bullet marker
      const bulletMatch = currentLine.match(/^([•\-\*]\s*)/);

      if (bulletMatch) {
        e.preventDefault();
        const bulletPrefix = bulletMatch[1];
        const lineContent = currentLine.substring(bulletPrefix.length).trim();

        let updatedNotes = '';
        let nextCursor = 0;

        if (lineContent === '') {
          // Empty bullet line -> user pressed Enter to exit list
          const lineStart = lastNewline + 1;
          updatedNotes = value.substring(0, lineStart) + value.substring(selectionEnd);
          nextCursor = lineStart;
        } else {
          // Add next bullet line automatically
          const insertBullet = '\n• ';
          updatedNotes = value.substring(0, selectionStart) + insertBullet + value.substring(selectionEnd);
          nextCursor = selectionStart + insertBullet.length;
        }

        setNotes(updatedNotes);
        storageService.saveNotes(updatedNotes);
        setSaveStatus('SAVING...');
        setTimeout(() => setSaveStatus('SAVED'), 300);

        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = nextCursor;
            textareaRef.current.selectionEnd = nextCursor;
          }
        });
      }
    }
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    onPlayClick?.();
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = notes.substring(start, end);

    if (prefix === '• ') {
      // Toggle bullet point logic
      if (start !== end) {
        const lines = selectedText.split('\n');
        const allBulleted = lines.every((l) => l.startsWith('• '));
        const modified = allBulleted
          ? lines.map((l) => l.replace(/^•\s*/, '')).join('\n')
          : lines.map((l) => (l.startsWith('• ') ? l : `• ${l}`)).join('\n');

        const updated = notes.substring(0, start) + modified + notes.substring(end);
        setNotes(updated);
        storageService.saveNotes(updated);
      } else {
        const lastNewline = notes.lastIndexOf('\n', start - 1);
        const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
        const nextNewline = notes.indexOf('\n', start);
        const lineEnd = nextNewline === -1 ? notes.length : nextNewline;
        const currentLine = notes.substring(lineStart, lineEnd);

        let replacement = '';
        if (currentLine.startsWith('• ')) {
          replacement = currentLine.replace(/^•\s*/, '');
        } else {
          replacement = `• ${currentLine}`;
        }

        const updated = notes.substring(0, lineStart) + replacement + notes.substring(lineEnd);
        setNotes(updated);
        storageService.saveNotes(updated);
      }
    } else {
      const replacement = `${prefix}${selectedText || 'Text'}${suffix}`;
      const updated = notes.substring(0, start) + replacement + notes.substring(end);
      setNotes(updated);
      storageService.saveNotes(updated);
    }

    setSaveStatus('SAVING...');
    setTimeout(() => setSaveStatus('SAVED'), 300);
  };

  return (
    <div className="bg-gradient-to-b from-[#111318] via-[#101216] to-[#0c0d11] border border-[#1b1e26] rounded-lg p-3.5 shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
      {/* Panel Header */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] shadow-[0_0_5px_#ef4444]" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#dedad0] uppercase">
            LOCAL NOTES
          </span>
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 bg-[#0b0c0f] border border-[#181b22] rounded p-0.5">
          <button
            onClick={() => insertFormatting('**', '**')}
            className="w-5 h-5 text-[10px] font-mono font-bold text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => insertFormatting('<u>', '</u>')}
            className="w-5 h-5 text-[10px] font-mono underline text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Underline"
          >
            U
          </button>
          <button
            onClick={() => insertFormatting('~', '~')}
            className="w-5 h-5 text-[10px] font-mono line-through text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Strikethrough"
          >
            S
          </button>
          <button
            onClick={() => insertFormatting('• ')}
            className="w-5 h-5 text-[11px] font-mono text-[#868d9e] hover:text-[#f5f0db] hover:bg-[#181b22] rounded flex items-center justify-center transition-colors"
            title="Bullet point (Auto on Enter)"
          >
            •
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[8px] font-mono tracking-widest text-[#22c55e]/80 uppercase bg-[#0d120f] border border-[#1a2e20] px-1.5 py-0.5 rounded">
            AUTO-BULLETS
          </span>
          <span className="text-[8px] font-mono tracking-widest text-[#5c6374] uppercase">
            LOCAL
          </span>
        </div>
      </div>

      {/* Editable Notes Textarea with Auto-Bullet on Enter */}
      <div className="relative flex-1 my-1 min-h-0">
        <textarea
          ref={textareaRef}
          id="notes-textarea"
          value={notes}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter notes... (bullets added automatically on Enter)"
          className="w-full h-full bg-[#090a0d] border border-[#1b1e26] rounded-md p-3 text-xs font-mono text-[#dedad0] leading-relaxed resize-none focus:outline-none focus:border-[#2f3442] transition-colors"
        />
        <div className="absolute bottom-2 left-3 text-[8px] font-mono tracking-widest text-[#414756] uppercase select-none pointer-events-none">
          STORED ON THIS BROWSER
        </div>
      </div>

      {/* Footer Controls: Save Status & SAVE Button */}
      <div className="flex items-center justify-between pt-2 border-t border-[#181b22] shrink-0">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${saveStatus === 'SAVED' ? 'bg-[#22c55e] glow-green' : 'bg-[#f59e0b] animate-ping'}`} />
          <span className="text-[9px] font-mono tracking-widest text-[#22c55e] uppercase">
            {saveStatus}
          </span>
        </div>

        <button
          onClick={handleManualSave}
          className="px-4 py-1 border border-[#2a2e39] bg-[#12141a] hover:bg-[#181b22] rounded text-[10px] font-mono font-bold tracking-widest text-[#dedad0] uppercase hover:border-[#3b4150] transition-all active:scale-95"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};
