import toast from "react-hot-toast"

export const handleAlert =(msg, status, pos,icon,dur)=>{
    const options = {
        duration:dur,
        position:pos
    }
    if(icon){
        options.icon = icon
    }
    if(status === "success"){
        toast.success(msg,options)
    }else if(status === "error"){
        toast.error(msg,options)
    }else{
        toast(msg,options)
    }
} 