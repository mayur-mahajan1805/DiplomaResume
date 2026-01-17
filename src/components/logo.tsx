import { Compass } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-bold text-lg text-sidebar-primary">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground p-1.5 rounded-lg">
        <Compass size={20} />
      </div>
      <span className="group-data-[collapsible=icon]:hidden">
        CareerCompass AI
      </span>
    </div>
  );
}
