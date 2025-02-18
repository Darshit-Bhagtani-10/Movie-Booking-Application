import React, { useState } from "react";

interface SeatInfo {
  id: string;
  status: 'AVAILABLE' | 'BOOKED' | 'LOCKED';
  number: string;
}

interface CustomSeatSelectorProps {
  layout: {
    rows: SeatInfo[][];
    columns: number;
  };
  maxSelections: number;
  gap?: number;
  seatSize?: string;
  onSeatSelect?: (selectedSeats: string[]) => void;
  colors?: {
    booked: string;
    available: string;
    selected: string;
  };
}

const CustomSeatSelector: React.FC<CustomSeatSelectorProps> = ({
  layout,
  maxSelections,
  gap = 2,
  seatSize = "40px",
  onSeatSelect = () => {},
  colors = {
    booked: "bg-gray-600",
    available: "bg-purple-500",
    selected: "bg-orange-500",
  }
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: SeatInfo) => {
    if (seat.status !== 'AVAILABLE') return;

    const isSelected = selectedSeats.includes(seat.number);
    let updatedSelections: string[];

    if (isSelected) {
      updatedSelections = selectedSeats.filter(num => num !== seat.number);
    } else if (selectedSeats.length < maxSelections) {
      updatedSelections = [...selectedSeats, seat.number];
    } else {
      return;
    }

    setSelectedSeats(updatedSelections);
    onSeatSelect(updatedSelections);
  };

  const getSeatColor = (seat: SeatInfo): string => {
    if (selectedSeats.includes(seat.number)) return colors.selected;
    return seat.status === 'AVAILABLE' ? colors.available : colors.booked;
  };

  if (!layout.rows.length) return <div>No seats available</div>;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Row Labels */}
      <div className="flex justify-end w-12 mr-2">
        <span className="text-sm text-gray-400">Row</span>
      </div>
      
      {/* Seats Grid */}
      {layout.rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex items-center">
          {/* Row Label */}
          <div className="w-12 text-right mr-2">
            <span className="text-sm text-gray-400">{String.fromCharCode(65 + rowIndex)}</span>
          </div>
          
          {/* Seats */}
          <div 
            className="flex"
            style={{ gap: `${gap * 4}px` }}
          >
            {row.map((seat, seatIndex) => (
              <div
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                className={`${getSeatColor(seat)} rounded-t-lg transition-colors duration-200 relative cursor-pointer hover:opacity-80 flex items-center justify-center`}
                style={{
                  width: seatSize,
                  height: seatSize,
                }}
                title={`${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`}
              >
                <span className="text-xs text-white opacity-75">
                  {seatIndex + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Legend */}
     
    </div>
  );
};

export default CustomSeatSelector;