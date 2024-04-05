import React, { useEffect } from 'react'
import WelcomePHeader from './welcomePage/WelcomeP_header'


export default function NotFound() {
  useEffect(()=>{
    const parentdiv = document.getElementsByClassName('div_animation')[0]
    parentdiv.setAttribute('style','display:flex')
    let l = false
    let caracter = 'ABCDEFGHIJKLMNOPQRSTUV'
    let r = ''
    
    function genrate(e) {
      setInterval(()=>{
        
        r = caracter.charAt((Math.floor(Math.random() * caracter.length)))
        let u = 'O'
        e.innerHTML=r;
      },3000)
      
    }
    setInterval(()=>{
        const size = Math.random()*40;

        let o = document.createElement('span');
        o.setAttribute('className','child');
        o.setAttribute('style',"color:white;opacity:0.67;font-size:3rem;transition:2s")
        o.style.width = 60 + size + "px";
        o.style.height = 60 + size + "px";
        o.style.left = Math.random() * size + 'px';
        o.style.transitionDelay = Math.random() * 2 +'s'
        genrate(o)
        parentdiv.appendChild(o)
        l=true
      },500)
    
  })

  return (
    <div className="par" style={{position: 'relative',width: '100%',height: '100vh',overflow:'hidden'}}>
      <WelcomePHeader />
      <div className='div_animation'>

      </div>
      <div className='not_found'>
        <p> Not Found</p>
      </div>
    </div>
  )
}
