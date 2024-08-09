        import React,{useState,useEffect,useRef} from 'react'
        import Left from "../homePage/left"
        import Right from '../homePage/right'
        import { useParams } from 'react-router'
        import NavComment from './NavComment'
        import AccountOfthePost from './AccountOfthePost'
        import TextOfThePost from './textOfThePost'
        import "./insidePost.css"
        import { MoonLoader} from "react-spinners";
        import TheInputOfTheComment from './TheInputOfTheComment'
        import Thereplies from './Thereplies'
        const InsideThePost = () => {
            const [Urprofile, setProfile] = useState([])
            const [backAndFourth, setBackAndFourth] = useState(false)
            const idLocal = localStorage.getItem("user")
            const [thePost, setThePost] = useState(null)
            const [theProfilePost, setTheProfile] = useState(null)
            const [theProfilePostReply, setThePostReply] = useState(null)
            const { id } = useParams()
            const [Thecomments, setThecomments] = useState(null)
            const [loding, setLoding] = useState(false)
            const funLogin = async () => {
                const response = await fetch(`http://localhost:4000/clone/getuser/${JSON.parse(idLocal)?._id}`)
                const json = await response.json()
                setProfile(json)
                }///get your account from the localhost
                useEffect(() => {
                    
                        funLogin()
                    
                
                }, [])
                const GetText = async () => {
                    const response = await fetch(`http://localhost:4000/clone/texts/getOneText/${id}`)
                    const json = await response.json()
                    if (response.ok) {
                        setThePost(json)
                        // console.log(json)
                    }
                    const responseReply = await fetch(`http://localhost:4000/clone/replying/getreplyingComments/${id}`)
                    const jsonReply = await responseReply.json()
                    if (responseReply.ok) {
                        setThePostReply(jsonReply)
                        // console.log(jsonReply)
                    }
                    const accountOfThePost = await fetch(`http://localhost:4000/clone/getuser/${json!==null?json.idText:jsonReply.idOfTheReplyer}`)
                    const accountOfThePostJson = await accountOfThePost.json()
                    if (accountOfThePost.ok) {
                        setTheProfile(accountOfThePostJson)
                        setLoding([accountOfThePostJson]?.length >0)
                        // console.log([accountOfThePostJson].length)
                    }
                // console.log(accountOfThePostJson)
                    
                }//we make a responses function with three apis 1:get a post from text 2:get a post from a comment 3:it recives an account of the post or a comment, if theres a comment it recives a account of the comment if it's not it recives an account of the poast
                useEffect(() => {
                    
                        GetText()
                        
                    
                    
                }, [])
            const usersOfTheFollwoingFunction = async (e) => {
                const oks =  thePost !== null ? await thePost?.comments?.toReversed()?.map(res => `http://localhost:4000/clone/replying/getreplyingComments/${res}`) :
                await theProfilePostReply?.comments?.toReversed()?.map(res => `http://localhost:4000/clone/replying/getreplyingComments/${res}`)

                const fetchTodo = async (url) => {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
                };
                
                await Promise.all(oks &&oks?.map((item) => fetchTodo(item)))
                .then((res) => {
                    setThecomments(res.flat());
                    // console.log(res)
                })
                .catch((err) => console.error(err));
                
            }//we make Promise all basically when you get array of the api's we fetch them all if theres a post we fetch the comment of the post if there's no post we fetch the comment of the reply
            useEffect(() => {
                
                    usersOfTheFollwoingFunction()
                
            }, [theProfilePostReply,thePost])
        
        
        return (
            <div>
                {!loding ?
                    <div className='moonLoader insideThePost'>
                        <MoonLoader color="#01b3ff" size={30} />
                    </div>
                    :
                    <div className='homePageAll'>
                        {/* <div className='TheLeft'> */}
                            <Left Urprofile={Urprofile} setBackAndFourth={setBackAndFourth} backAndFourth={backAndFourth} />
                        {/* </div> */}
                        <div onClick={(() => setBackAndFourth(false))} className='center'>
                            <div className='containerCenter insidePost'>
                                {/* ////////////////////////////////NAV//////////////////////////////////////////////////////////////// */}
                                <NavComment />
                            
                                {/* ////////////////////////////THE POST////////////////////////////////////////////////////// */}
                                <div className='insidePost'>
                                    {/* /////////////////////////ACCOUNT OF THE TWEITTER//////////////////////////////////////// */}
                                    <AccountOfthePost id={id} />
                                    {/* ////////////////////////THE TEXT OF THE POST//////////////////////////////////////////////////////// */}
                                    <div className='thePost'>
                                    
                                        <TextOfThePost />
                                        <div className='borderInsidePost'></div>
                                        <TheInputOfTheComment Urprofile={Urprofile} usersOfTheFollwoingFunction={usersOfTheFollwoingFunction}
                                            thePost={thePost} GetText={GetText} theProfilePostReply={theProfilePostReply}
                                        />
                                        <div className='borderInsidePost'></div>
                                    {/* ////////////////////////THE TEXT OF THE COMMENT//////////////////////////////////////////////////////// */}
                                        <div className='theComments'>
                                            {Thecomments?.map((res, index) => (
                                                <Thereplies res={res} index={index} GetText={GetText}
                                                usersOfTheFollwoingFunction={usersOfTheFollwoingFunction}
                                                    Thecomments={Thecomments} />
                                            ))}
                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right'>
            <div onClick={(()=>setBackAndFourth(false))} className='right'>
            <Right />
        </div>
        </div>
                    </div>
                }
                  
                                                                </div>
        )
        }

        export default InsideThePost
