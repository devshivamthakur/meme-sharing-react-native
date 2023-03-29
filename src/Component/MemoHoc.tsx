import React ,{memo} from 'react'
interface MemoHoc_{
    children:React.ReactNode

}
const MemoHoc = ({children}:MemoHoc_) => {
    if(children){
        return children
    }
  return null
}


export default memo(MemoHoc)