interface NotificationProps {
  message: string;
  color: string;
}
export default function Notifications({ message, color }: NotificationProps) {
  return (
    <div className="animate-display absolute z-10 top-10 w-9/10 left-1/2 -translate-x-1/2 spotify-gray-bg text-white h-20 flex flex-col items-center justify-center text-black rounded-lg shadow-lg">
        {message}
        <span className={`absolute bottom-0 h-2 w-full rounded-b-lg transition-all duration-300 translate-y-0 opacity-100 ` + handleColorSlection(color) }>
        </span>
    </div>
  )
}

function handleColorSlection(color: string): string {
  switch (color) {
    case 'yellow':
      return 'spotify-yellow-bg';
    case 'red':
      return 'spotify-red-bg';
    default:
      return 'spotify-green-bg';
  }
}