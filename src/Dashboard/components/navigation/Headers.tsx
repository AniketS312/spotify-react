
interface HeaderProps {  
   title: string;
}
export default function Header({title}: HeaderProps) {
  return (
    <span>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {/* <hr className="white w-5"/> */}
    </span>
  )
}