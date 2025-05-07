import React from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TranslationEntry } from "../../../context/TranslationContext";

interface TranslationListProps {
  translations: TranslationEntry[];
  onEdit: (word: string, value: string) => void;
  onReorder: (newOrder: TranslationEntry[]) => void;
}

const SortableItem: React.FC<{
  entry: TranslationEntry;
  onEdit: (word: string, value: string) => void;
}> = ({ entry, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: entry.word });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mb-2 border-b pb-2 border-b-gray-200 flex items-center justify-between px-2"
    >
      <div className="flex items-center">
        {/* Drag Handle Area (only this part is draggable) */}
        <div {...attributes} {...listeners} className="cursor-grab pr-2">
          ⠿
        </div>

        {/* Editable content */}
        <p className="font-bold">{entry.word}:</p>
      </div>
      <div className="w-40">
        <input
          type="text"
          value={entry.translation ?? ""}
          onChange={(e) => onEdit(entry.word, e.target.value)}
          className="bg-gray-100 rounded-lg shadow-sm !w-40"
        />
      </div>
    </div>
  );
};

const TranslationList: React.FC<TranslationListProps> = ({
  translations,
  onEdit,
  onReorder,
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = translations.findIndex((e) => e.word === active.id);
      const newIndex = translations.findIndex((e) => e.word === over?.id);
      const reordered = arrayMove(translations, oldIndex, newIndex);
      onReorder(reordered);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={translations.map((t) => t.word)}
        strategy={verticalListSortingStrategy}
      >
        {translations.map((entry) => (
          <SortableItem key={entry.word} entry={entry} onEdit={onEdit} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TranslationList;
