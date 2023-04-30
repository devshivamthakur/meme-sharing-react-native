import { showMessage } from "react-native-flash-message"

interface messagetype{
    message: any,
}

export const ErrorMessage=(message:messagetype)=>{
    if(message?.status==0){
        showMessage({
            message:"Internet is not available",
            type:"danger",
            icon:"danger",
            duration:3000
        })
        return "Internet is not available"
    }else if(message?.status==502){
        showMessage({
            message:"Server is not available ,please try again later",
            type:"danger",
            icon:"danger",
            duration:3000

        })
        return "Server is not available ,please try again later"
    }else{
        let errormessage=message?.data?.message?message.data.message:"Something went wrong"
        showMessage({
            message:errormessage,
            type:"danger",
            icon:"danger",
            duration:3000

        })

        return errormessage
    }

}