
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaCarSide } from "react-icons/fa";
export const Data   = [
    {
        id:"dashboard",
        name:"Dashboard",
        logo:<LuLayoutDashboard/>,
          path:"/"
    },
    {
        id:"teachers",
        name:"Teachers",
        logo:<GiTeacher/>,
        path:"/teachers"
    },
    {
        id:"students",
        name:"Students",
        logo:<PiStudentBold/>,
          path:"/students"
    },
    {
        id:"driver",
        name:"Drivers",
        logo:<FaCarSide/>,
          path:"/driver"
    }
]