import Header from "./Headers";
import menu from "./Navigation";


type MenuItem = {
  name: string;
  path: string;
};

interface MainNavProps {
handleFunction: (item: MenuItem) => void;
}

export default function MainNav({handleFunction} : MainNavProps) {

  
  return (
     <nav className='flex flex-col justify-evenly w-1/8 border border-2 border-white'>
      <section className="flex flex-col justify-start items-start h-2/3 ">
        {menu.map((section) => (
          <div key={section.title} className="flex w-full flex-col items-start pl-2 gap-1">
              <Header title={section.title} /> 
              <ul className="flex flex-col w-full">
                {section.items.map((item) => (
                  <li key={item.name} className="py-2 pl-2 w-[90%] cursor-pointers hover:bg-[rgb(40,40,40)] rounded-md">
                    <a onClick={() => handleFunction(item)} className="flex flex-row items-center gap-2">
                      <i className=''>{item.icon}</i>
                    {item.name}</a>
                  </li>
                ))}
              </ul>
          </div>
        ))}
      </section>
      <section>
        Something 
      </section> 
      </nav>
  )
}