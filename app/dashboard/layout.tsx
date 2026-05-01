"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/app/libs/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser(data.user);
        }
      }
    };
    fetchUser();
  }, [user, setUser]);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { name: "New Proposal", href: "/dashboard/new-proposal", icon: PlusCircleIcon },
    { name: "Profile Analysis", href: "/dashboard/profile", icon: UserCheckIcon },
    { name: "Proposal History", href: "/dashboard/history", icon: ClockIcon },
    { name: "Tracker", href: "/dashboard/tracker", icon: TargetIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChartIcon },
    { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
    router.replace("/");
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-sans text-slate-900">
      <aside className="flex w-[260px] flex-col justify-between border-r border-slate-200 bg-[#F8F9FB] px-4 py-6">
        <div>
          <div className="mb-10 px-2">
            <h1 className="text-2xl font-bold text-indigo-700 tracking-tight">relateedge<span className="text-indigo-400">.</span></h1>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">Enterprise Suite</p>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white text-indigo-700 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-100"
                      : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-indigo-700" : "text-slate-400"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4 px-2">
          <button
            onClick={() => {}}
            className="w-full rounded-2xl bg-[#3730A3] px-4 py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-800 flex items-center justify-center gap-2"
          >
            Create New
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between px-8">
          <div className="relative w-96">
            <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search insights..."
              className="w-full rounded-full bg-slate-100/50 border-none py-2.5 pl-12 pr-4 text-sm outline-none focus:bg-white focus:ring-1 focus:ring-slate-200 transition-all text-slate-600 placeholder:text-slate-400 font-medium"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <button className="text-slate-500 hover:text-slate-700 transition-colors relative">
               <BellIcon className="h-5 w-5" />
               <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-indigo-600 border-2 border-[#F8F9FB]"></span>
            </button>
            <button className="text-slate-500 hover:text-slate-700 transition-colors">
               <HelpIcon className="h-5 w-5" />
            </button>
            <div 
              className="relative ml-2"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <button className="h-9 w-9 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer">
                 <div className="h-full w-full bg-teal-800 flex items-center justify-center">
                   <UserIcon className="h-5 w-5 text-white" />
                 </div>
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.98 },
                      visible: { 
                        opacity: 1, y: 0, scale: 1,
                        transition: { type: "spring", damping: 25, stiffness: 300, staggerChildren: 0.04 }
                      },
                      exit: { opacity: 0, y: 5, scale: 0.98, transition: { duration: 0.1 } }
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 top-full mt-3 w-[340px] rounded-[32px] bg-white p-5 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-100 z-50 origin-top-right"
                  >
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                      <div className="flex items-center gap-4 rounded-3xl bg-slate-50/80 p-4 mb-5 border border-slate-100 shadow-sm relative overflow-hidden group hover:bg-slate-50 transition-colors cursor-pointer">
                         <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                            <UserIcon className="h-6 w-6 text-slate-500" />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-800 tracking-tight text-[15px]">
                               {user ? `${user.user_metadata?.firstName|| 'User'} ${user.user_metadata?.last_name || ''}` : "Loading..."}
                            </h4>
                            <p className="text-[12px] text-slate-500 font-medium">
                               {user ? user.email : "..."}
                            </p>
                         </div>
                      </div>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-2.5 mb-5">
                       <DropdownTile icon={<DashboardIcon className="h-6 w-6" />} label="Home" />
                       <DropdownTile icon={<SettingsIcon className="h-6 w-6" />} label="Settings" />
                       <DropdownTile icon={<UserCheckIcon className="h-6 w-6" />} label="Profile" />
                       <DropdownTile icon={<BarChartIcon className="h-6 w-6" />} label="Stats" />
                       <DropdownTile icon={<TargetIcon className="h-6 w-6" />} label="Tracker" />
                       <DropdownTile icon={<ClockIcon className="h-6 w-6" />} label="History" />
                    </div>

                    <motion.button 
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                      onClick={handleSignOut} 
                      className="group w-full flex items-center justify-center gap-2.5 rounded-[20px] bg-slate-50 px-4 py-3.5 text-[14px] font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all border border-slate-100 hover:border-red-100"
                    >
                      <LogOutIcon className="h-5 w-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                      <span>Sign Out</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function DropdownTile({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.button 
      variants={{ hidden: { opacity: 0, y: 10, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center justify-center gap-2.5 rounded-[20px] bg-white p-4 transition-all shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-indigo-200 hover:shadow-[0_10px_20px_-10px_rgba(79,70,229,0.15)] overflow-hidden"
    >
      <motion.div 
        variants={{ hover: { scale: 1.1, y: -2 } }}
        className="relative z-10 text-slate-400 transition-colors duration-300 group-hover:text-indigo-600"
      >
        {icon}
      </motion.div>
      <span className="relative z-10 text-[12px] font-bold tracking-wide text-slate-500 transition-colors duration-300 group-hover:text-indigo-700">{label}</span>
      
      <motion.div 
        variants={{ hover: { y: 0 } }}
        initial={{ y: "100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="absolute inset-0 bg-indigo-50/50 z-0"
      />
    </motion.button>
  );
}

function DashboardIcon(props: any) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
       <path d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm0 8h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4a1 1 0 001 1zm10 0h6a1 1 0 001-1v-8a1 1 0 00-1-1h-6a1 1 0 00-1 1v8a1 1 0 001 1zm0-18v4a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1h-6a1 1 0 00-1 1z" />
    </svg>
  );
}
function PlusCircleIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function UserCheckIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}
function ClockIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function TargetIcon(props: any) {
  return (
     <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
     </svg>
  )
}
function BarChartIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )
}
function SettingsIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
function SearchIcon(props: any) {
   return (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
   )
}
function BellIcon(props: any) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
       <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </svg>
  )
}
function HelpIcon(props: any) {
  return (
     <svg {...props} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
     </svg>
  )
}
function UserIcon(props: any) {
  return (
     <svg {...props} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
     </svg>
  )
}

function LogOutIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );
}