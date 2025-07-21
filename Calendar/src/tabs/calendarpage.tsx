import React, { useState, useRef, useEffect } from 'react';
import { FiEye, FiEdit } from 'react-icons/fi';
import TableHead from '../components/TopHead';
// import Pagination      from '../components/Pagination';
import IconButton      from '../components/IconButton';
import NoDataFound     from '../components/NoDataFound';
import DatePickerReact from '../components/ReactDatePicker';
import CalendarModal   from '../pages/Calendar';
import AddTaskModal    from '../forms/Addtask'
import { useLocation } from "react-router-dom";
import PlanMyCalendar from './planmycalendar';

interface CalEvent {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Synced' | 'Pending';
}

const fmt = (d: Date) => d.toISOString().split('T')[0];
const weekStart = (() => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; })();
const to24 = (h: string) => { const n = parseInt(h); return h.includes('PM') && n !== 12 ? n + 12 : n; };
const HOURS = ['10AM','11AM','12PM','1PM','2PM','4PM'];
const DAYS  = ['Mo','Tu','We','Th','Fr','Sa'];

const seed: CalEvent[] = [
  { id: 1, title: 'Meeting',  date: fmt(weekStart),                  startTime: '10:00', endTime: '11:00', status: 'Synced'  },
  { id: 2, title: 'Project',  date: fmt(new Date(+weekStart+864e5)), startTime: '10:00', endTime: '11:00', status: 'Pending' },
  { id: 3, title: 'Meeting',  date: fmt(weekStart),                  startTime: '11:00', endTime: '12:00', status: 'Synced'  },
  { id: 4, title: 'Demo',     date: fmt(weekStart),                  startTime: '12:00', endTime: '13:00', status: 'Pending' },
  { id: 5, title: 'Lunch',    date: fmt(weekStart),                  startTime: '13:00', endTime: '14:00', status: 'Synced'  },
  { id: 6, title: 'Test22',   date: fmt(new Date(+weekStart+864e5)), startTime: '12:00', endTime: '13:00', status: 'Pending' },
  { id: 7, title: 'Test21',   date: fmt(new Date(+weekStart+2*864e5)), startTime: '14:00', endTime: '15:00', status: 'Pending' },
  { id: 8, title: 'Market and competitor analysis', date: fmt(weekStart), startTime: '16:00', endTime: '17:00', status: 'Synced' },
];

// const PAGE_SIZE = 5;
const MIN_PANE = 80;
const MAX_PANE = 450;
const START_PANE = 300;

const CategoryTab: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  // Debug: Log when component mounts and modal state changes
  useEffect(() => {
    console.log('Calendar page mounted, showModal:', showModal);
  }, [showModal]);
  const [events, setEvents] = useState<CalEvent[]>(seed);

  const [paneH, setPaneH] = useState(START_PANE);
  const collapsed = paneH < MIN_PANE;
  const dragRef = useRef(false);
  const yRef = useRef(0);
  const hRef = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dh = e.clientY - yRef.current;
      setPaneH(Math.min(MAX_PANE, Math.max(0, hRef.current + dh)));
    };
    const up = () => (dragRef.current = false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, []);

  // Remove pagination state and logic
  // const [page, setPage] = useState(1);
  // const tableRows = events.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  // const tablePages = Math.ceil(events.length / PAGE_SIZE);
  const tableRows = events.slice(0, 5);

  const [quick, setQuick] = useState<'today'|'8'|'30'>('today');
  const [picked, setPicked] = useState<Date|null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(true); // Control calendar open state

  /* Add Task modal state */
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const [showPlanMyCalendar, setShowPlanMyCalendar] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData('text/plain', id.toString());
  };
  const handleDrop = (date: string, hour24: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'), 10);
    setEvents(evts =>
      evts.map(ev =>
        ev.id === id ? { ...ev, date, startTime: `${hour24.toString().padStart(2,'0')}:00` } : ev
      )
    );
  };

  const location = useLocation();
  const scheduleData = location.state;

  useEffect(() => {
    if (scheduleData && scheduleData.selectedDays?.length > 0) {
      const newEvents = scheduleData.selectedDays.map((day: string, i: number) => {
        const date = new Date(+weekStart + i * 864e5);
        return {
          id: Date.now() + i,
          title: 'Scheduled Slot',
          date: fmt(date),
          startTime: scheduleData.startTime,
          endTime: scheduleData.endTime,
          status: 'Pending',
        };
      });
      setEvents((prev) => [...prev, ...newEvents]);
    }
  }, [scheduleData]);

  return (
    <>
      {showModal && <CalendarModal isOpen={true} onClose={() => setShowModal(false)} />}

      {showPlanMyCalendar ? (
        <PlanMyCalendar />
      ) : (
        <div className={showModal || isAddTaskModalOpen ? 'blur-sm' : ''} style={{ fontFamily: "'PT Sans', sans-serif", color: '#444' }}>
          <div className="flex h-screen flex-col px-4 pb-6" style={{ fontFamily: "'PT Sans', sans-serif", color: '#444' }}>
            <section style={{height:paneH,transition:dragRef.current?'none':'height .15s'}} className={collapsed?'overflow-hidden':''}>
              {!collapsed && (
                <div className="bg-white py-6 px-4 shadow-sm rounded flex h-full flex-col gap-6">
                  {/* <div className="flex items-center gap-2 text-sm font-medium text-gray-600">← Setup <span>&rsaquo;</span> Calendar</div> */}
                  <div className="flex gap-2">
                    <button className="rounded bg-[#7991BB] hover:bg-[#5D79A5] px-3 h-10 py-1 text-xs text-white" onClick={() => {
   alert('Google Calendar integration is not available (backend removed).');
 }}>Sync to Google</button>
                    <button className="rounded bg-[#7991BB] hover:bg-[#5D79A5] px-3 py-1 text-xs text-white" onClick={() => setShowPlanMyCalendar(true)}>Plan My Calendar</button>
                    
  
                  </div>
                  <button className="w-20 h-13 rounded border text-sm" onClick={() => setIsAddTaskModalOpen(true)}>Add</button>

                  <div className="flex gap-2 overflow-hidden">
                    <div className="flex-1 min-w-0">
                      <div className="border border-gray-300">
                        <TableHead columns={[{label:'Action'},{label:'Event'},{label:'Date/Time'},{label:'Status'}]}/>
                        {tableRows.length===0? <NoDataFound/> : tableRows.map(ev=>(
                          <div key={ev.id} className="grid grid-cols-[10%_35%_35%_20%] items-center border-t border-gray-300 px-3 py-2 text-sm">
                            <div className="flex gap-2 justify-center">
                              <IconButton tooltip="View"><FiEye/></IconButton>
                              <IconButton tooltip="Edit"><FiEdit/></IconButton>
                            </div>
                            <div className="text-center">{ev.title}</div>
                            <div className="text-center">{ev.date} {ev.startTime}</div>
                            <div className="text-center">{ev.status}</div>
                          </div>
                        ))}
                      </div>
                      {/* Pagination removed */}
                    </div>
                    <div className="w-80 min-h-[420px] shrink-0 space-y-3 overflow-visible">
                      <div className="flex gap-2">{(['today','8','30'] as const).map(id=>(
                        <button key={id} onClick={()=>setQuick(id)} className={`rounded px-2 py-1 text-xs ${quick===id?'bg-[#7991BB] text-white':'bg-gray-100 hover:bg-gray-200'}`}>
                          {id==='today'?'Today':id==='8'?'Last 8 days':'Last month'}
                        </button>
                      ))}</div>
                      <DatePickerReact
                        label=""
                        value={picked}
                        onChange={e=>setPicked(e.target.value)}
                        inline
                        popperContainer={({ children }: { children: React.ReactNode }) => <div>{children}</div>}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            <div onMouseDown={e=>{dragRef.current=true;yRef.current=e.clientY;hRef.current=paneH;}}
                 className="flex cursor-row-resize select-none items-center justify-center text-xl text-gray-600">{collapsed?'↓':'↑'}</div>

            <div className="flex-1 overflow-auto" style={{ fontFamily: "'PT Sans', sans-serif", color: '#444' }}>
              <WeekGrid
                events={events}
                weekStart={weekStart}
                collapsed={collapsed}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onEmptyCellClick={() => setIsAddTaskModalOpen(true)}
              />
            </div>
          </div>
        </div>
      )}
      {/* Render AddTaskModal */}
      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} />
    </>
  );
};

interface GridProps {
  events: CalEvent[];
  weekStart: Date;
  collapsed: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDrop: (date: string, hour24: number) => (e: React.DragEvent) => void;
  onEmptyCellClick: () => void;
}

const WeekGrid: React.FC<GridProps> = ({ events, weekStart, collapsed, onDragStart, onDrop, onEmptyCellClick }) => {
  const rowH = collapsed ? 'h-20' : 'h-12';

  return (
    <div className="border min-w-[700px]" style={{ fontFamily: "'PT Sans', sans-serif", color: '#444' }}>
      <div className="grid" style={{gridTemplateColumns:'60px repeat(6,minmax(100px,1fr))'}}>
        <div className="bg-gray-200"/>
        {DAYS.map((d,i)=>{const dt=new Date(+weekStart+i*864e5);return(
          <div key={d} className="flex items-center justify-center bg-[#5D79A5] py-1 text-xs font-semibold text-white">
            {dt.getDate()} {d}
          </div>
        );})}
      </div>

      {HOURS.map(h=>{
        const hour24 = to24(h);
        return (
          <div key={h} className="grid border-t" style={{gridTemplateColumns:'60px repeat(6,minmax(100px,1fr))'}} >
            <div className={`flex items-center justify-center bg-[#5D79A5] text-white text-xs border-r ${rowH}`}>{h}</div>
            {DAYS.map((_, i) => {
              const cellDate = fmt(new Date(+weekStart + i * 864e5));
              const cellEvents = events.filter(ev => ev.date === cellDate && parseInt(ev.startTime, 10) === hour24);
              return (
                <div
                  key={i}
                  onDragOver={e => e.preventDefault()}
                  onDrop={onDrop(cellDate, hour24)}
                  className={`border-r last:border-r-0 bg-gray-50 p-1 text-xs ${rowH} flex flex-col items-center justify-center` }
                  onClick={() => {
                    if (cellEvents.length === 0) {
                      onEmptyCellClick();
                    }
                  }}
                  style={{ cursor: cellEvents.length === 0 ? 'pointer' : 'default' }}
                >
                  {cellEvents.map(ev => (
                    <div key={ev.id}
                         draggable
                         onDragStart={e => onDragStart(e, ev.id)}
                         className="w-full h-full flex items-center justify-center rounded bg-gray-300 border border-gray-400 text-center text-gray-800 cursor-grab active:cursor-grabbing m-0 p-0 shadow-md">
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryTab;
