export interface Userinfo{
    id: number
    name: string
    email: string
    google_id: string
    username: string
    profileurl: string
    is_logged_in: boolean
    device_id: string
    created_at: string
    updated_at: string
    user: number
    total_likes: number
    total_post: number
  }
  
  export interface UserPost {
    id: number
    description: string
    post_type: string
    media: Media[]
    created_at: string
    updated_at: string,
    is_liked: null|number,
    total_likes: number,
    user: Userinfo
  }
  
  export interface Media {
    id: number
    media_type: string
    file: string
    created_at: string
    updated_at: string
    thumbnail_url:string
  }
  
export interface Postinfoslice{

  Postlist:UserPost[],
  loading:boolean,
  pageno:number
}


export interface postinfoapiresponse{
  data:UserPost[],
  page:number
}

