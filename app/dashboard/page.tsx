"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/app/libs/supabase";
import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";

function displayFirstName(user: User | null): string {
  if (!user) return "there";
  const meta = user.user_metadata as Record<string, string | undefined>;
  const fromSignup = meta?.firstName;
  if (fromSignup) return fromSignup;
  const full = meta?.full_name ?? meta?.name;
  if (full) return full.split(/\s+/)[0] ?? full;
  const email = user.email;
  if (email) return email.split("@")[0] ?? "there";
  return "there";
}

export default function DashboardPage() {

    const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, [user, setUser]);
  const barData = [
    { name: "MON", value: 30 },
    { name: "TUE", value: 45 },
    { name: "WED", value: 35 },
    { name: "THU", value: 60 },
    { name: "FRI", value: 50 },
    { name: "SAT", value: 85 },
    { name: "SUN", value: 20 },
  ];

  const pieData = [
    { name: "Success", value: 84 },
    { name: "Remaining", value: 16 },
  ];
  const pieColors = ["#4338CA", "#E0E7FF"];

  return (
    <div className="max-w-6xl mt-4">
      <div className="mb-8">
        <h2 className="text-[22px] font-bold text-slate-800">Welcome back, {displayFirstName(user)}</h2>
        <p className="text-sm text-slate-500 mt-1">Your AI-powered strategist has 3 new insights for you today.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="PROPOSALS" value="42" badge="+12%" badgeType="success" />
            <StatCard title="REPLIES" value="18" badge="+5%" badgeType="success" />
            <StatCard title="INTERVIEWS" value="7" badge="Static" badgeType="neutral" />
            <div className="rounded-3xl bg-[#3730A3] p-6 text-white shadow-sm flex flex-col justify-between">
               <p className="text-[11px] font-bold tracking-widest uppercase opacity-80">HIRE RATE</p>
               <div className="flex items-end justify-between mt-3">
                 <span className="text-4xl font-bold tracking-tight">24%</span>
                 <span className="rounded-full bg-indigo-500/40 px-2.5 py-1 text-[10px] font-bold text-indigo-50">+2%</span>
               </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-4 mt-2">
              <h3 className="text-[17px] font-bold text-slate-800">Strategic Insights</h3>
              <button className="text-[13px] font-bold text-indigo-700 hover:text-indigo-800 tracking-wide">View All &rsaquo;</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="rounded-3xl border border-indigo-100 bg-[#EEF2FF] p-6 relative overflow-hidden">
                 <div className="flex justify-between items-start mb-6">
                    <div className="h-10 w-10 rounded-2xl bg-white shadow-sm"></div>
                    <span className="rounded-full bg-[#FFEDD5] px-3 py-1.5 text-[10px] font-bold text-[#C2410C] uppercase tracking-wider">Efficiency</span>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-2">Length Optimization</h4>
                 <p className="text-[13px] text-slate-600 leading-relaxed pr-2">
                   Short proposals perform <span className="font-semibold text-indigo-700">23% better</span> this week. Try trimming your intros to 2 sentences.
                 </p>
               </div>

               <div className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 relative overflow-hidden">
                 <div className="flex justify-between items-start mb-6">
                    <div className="h-10 w-10 rounded-2xl bg-white border border-slate-100 shadow-sm"></div>
                    <span className="rounded-full bg-[#E0F2FE] px-3 py-1.5 text-[10px] font-bold text-[#0369A1] uppercase tracking-wider">Growth</span>
                 </div>
                 <h4 className="font-bold text-slate-800 mb-2">Hook Performance</h4>
                 <p className="text-[13px] text-slate-600 leading-relaxed pr-2">
                   Technical hooks are driving <span className="font-semibold text-indigo-700">more replies</span> for you lately. Focus on "Architecture" keywords.
                 </p>
               </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 mt-6">
             <div className="flex items-center justify-between">
                <div className="max-w-sm">
                   <h3 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Success Probability: 84%</h3>
                   <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
                     Your current proposal style for "React Development" roles is highly competitive. We recommend doubling down on these listings today.
                   </p>
                   <button className="rounded-2xl bg-[#EEF2FF] px-6 py-3 text-[13px] font-bold tracking-wide text-[#3730A3] hover:bg-indigo-100 transition-colors">
                     Optimize My Pitch
                   </button>
                </div>
                <div className="h-44 w-44 relative mr-4">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={pieData}
                         innerRadius={65}
                         outerRadius={85}
                         startAngle={90}
                         endAngle={-270}
                         dataKey="value"
                         stroke="none"
                         cornerRadius={8}
                       >
                         {pieData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                         ))}
                       </Pie>
                     </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-3xl font-bold text-slate-800">84%</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-7 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 h-[380px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <h3 className="font-bold text-slate-800">Reply Success Rate</h3>
               <button className="text-slate-400 hover:text-slate-600">
                  <DotsHorizontalIcon className="h-5 w-5" />
               </button>
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} dy={10} />
                  <Tooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" fill="#EEF2FF" radius={[6, 6, 6, 6]} activeBar={<Cell fill="#3730A3" />} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 rounded-2xl bg-[#F8FAFC] p-4 border border-slate-100">
               <div className="flex items-center gap-2.5 mb-1.5">
                 <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                 <span className="text-[11px] font-bold text-slate-700 tracking-wide">Proactive Tip</span>
               </div>
               <p className="text-[11px] text-slate-500 leading-relaxed">
                 Clients are 3x more likely to reply between 9 AM and 11 AM your time.
               </p>
            </div>
          </div>

          <div className="pl-2">
            <h3 className="font-bold text-slate-800 mb-6">Recent Activity</h3>
            <div className="space-y-6">
               <ActivityItem 
                 icon={<MailIcon className="h-4 w-4 text-[#3730A3]" />} 
                 title="New Reply: Cloud Migration" 
                 time="2 hours ago" 
                 iconBg="bg-[#EEF2FF]"
               />
               <ActivityItem 
                 icon={<EyeIcon className="h-4 w-4 text-slate-500" />} 
                 title="Proposal Read: UX Audit" 
                 time="5 hours ago" 
                 iconBg="bg-slate-100"
               />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, badge, badgeType }: { title: string, value: string, badge: string, badgeType: "success" | "neutral" }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
      <p className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">{title}</p>
      <div className="flex items-end justify-between mt-3">
        <span className="text-4xl font-bold text-slate-800 tracking-tight">{value}</span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
          badgeType === 'success' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-slate-100 text-slate-600'
        }`}>
          {badge}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, time, iconBg }: { icon: React.ReactNode, title: string, time: string, iconBg: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`h-10 w-10 shrink-0 rounded-2xl flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <div className="pt-0.5">
        <p className="text-[13px] font-bold text-slate-800">{title}</p>
        <p className="text-[11px] font-medium text-slate-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

function DotsHorizontalIcon(props: any) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

function MailIcon(props: any) {
   return (
     <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
     </svg>
   )
}

function EyeIcon(props: any) {
   return (
     <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
     </svg>
   )
}