"use client";
import {useState} from "react";
import Link from "next/link";
import {createClient} from "@/lib/supabase/client";
export default function Auth(){
 const sb=createClient();
 const [kind,setKind]=useState<"signin"|"signup">("signin");
 const [identity,setIdentity]=useState(""),[email,setEmail]=useState(""),[phone,setPhone]=useState(""),[name,setName]=useState(""),[address,setAddress]=useState(""),[password,setPassword]=useState(""),[confirm,setConfirm]=useState(""),[remember,setRemember]=useState(true),[msg,setMsg]=useState(""),[busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setMsg("");if(password.length<6){setMsg("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");return}if(kind==="signup"&&password!==confirm){setMsg("দুইটি পাসওয়ার্ড মিলছে না।");return}setBusy(true);
 let error:any=null;
 if(kind==="signup"){
   const isEmail=email.trim().length>0;
   const payload:any={password,options:{data:{full_name:name,phone:phone,address}}};
   if(isEmail){payload.email=email.trim();payload.options.emailRedirectTo=location.origin+"/account"}else payload.phone=phone.trim();
   const r=await sb.auth.signUp(payload);error=r.error;if(!error)setMsg(isEmail?"রেজিস্ট্রেশন হয়েছে। ইমেইল যাচাই করে লগইন করুন।":"রেজিস্ট্রেশন অনুরোধ গ্রহণ করা হয়েছে। Phone OTP provider configure না থাকলে ফোন signup সম্পন্ন হবে না।");
 }else{
   const value=identity.trim();const isEmail=value.includes("@");
   const r=await sb.auth.signInWithPassword(isEmail?{email:value,password}:{phone:value,password});error=r.error;if(!error)location.href="/account";
 }
 setBusy(false);if(error)setMsg(error.message);
 }
 async function forgot(){const value=identity.trim();if(!value.includes("@")){setMsg("Password reset-এর জন্য account email লিখুন।");return}const {error}=await sb.auth.resetPasswordForEmail(value,{redirectTo:location.origin+"/auth"});setMsg(error?error.message:"Password reset link ইমেইলে পাঠানো হয়েছে।")}
 return <main className="auth-page"><div className="auth-crumb"><Link href="/">⌂</Link><span>/</span>{kind==="signin"?"Login":"Register"}</div><section className="auth-card"><h1>{kind==="signin"?"Account Login":"Register Account"}</h1>
 {kind==="signin"?<form onSubmit={submit}>
 <label className="auth-label">Email / Phone (আপনার ফোন নম্বর / ইমেইল)<input required value={identity} onChange={e=>setIdentity(e.target.value)} placeholder="Email / Phone" autoComplete="username"/></label>
 <div className="auth-label-row"><label>Password (পাসওয়ার্ড)<span className="auth-link" onClick={forgot}>Forgotten Password?</span></label></div><input className="auth-input" required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" autoComplete="current-password"/>
 <label className="auth-check"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Remember me</label>
 <button className="auth-submit" disabled={busy}>{busy?"Please wait...":"Login"}</button>
 <div className="auth-divider">Don't have an account?</div><button type="button" className="auth-outline" onClick={()=>{setKind("signup");setMsg("")}}>Create Your Account</button>
 </form>:<form onSubmit={submit}>
 <label className="auth-label">Name (আপনার নাম) *<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Name" autoComplete="name"/></label>
 <label className="auth-label">Email (আপনার ইমেইল)<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" autoComplete="email"/></label>
 <label className="auth-label">Phone (আপনার ফোন নম্বর) *<input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+8801XXXXXXXXX" autoComplete="tel"/></label>
 <label className="auth-label">Address (আপনার ঠিকানা) *<textarea required value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address"/></label>
 <label className="auth-label">Password (পাসওয়ার্ড) *<input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 6 characters" autoComplete="new-password"/></label>
 <label className="auth-label">Confirm Password (কনফার্ম পাসওয়ার্ড) *<input required type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Confirm Password" autoComplete="new-password"/></label>
 <button className="auth-submit" disabled={busy}>{busy?"Please wait...":"Register"}</button><div className="auth-divider">Already have an account?</div><button type="button" className="auth-outline" onClick={()=>{setKind("signin");setMsg("")}}>Login</button>
 </form>}
 {msg&&<p className="auth-message" role="status">{msg}</p>}
 </section></main>
}