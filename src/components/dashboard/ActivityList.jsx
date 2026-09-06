import React from 'react';
import { CheckCircle2, FileText, GitMerge, UserPlus, Clock } from 'lucide-react';

const ActivityList = () => {
  const activities = [
    {
      id: 1,
      title: "Land record verified",
      desc: "Plot 45/2 (Lucknow Sadar) certified RoR generated",
      time: "10 mins ago",
      icon: CheckCircle2,
      color: "var(--success)"
    },
    {
      id: 2,
      title: "Mutation request approved",
      desc: "APP-2026-001 order signed by Tehsildar Sadar",
      time: "42 mins ago",
      icon: GitMerge,
      color: "var(--government-blue)"
    },
    {
      id: 3,
      title: "Record updated",
      desc: "Bhu-Aadhaar ULPIN linked for Khasra 18/7 (Haveli Tehsil)",
      time: "2 hours ago",
      icon: FileText,
      color: "var(--secondary-blue)"
    },
    {
      id: 4,
      title: "Citizen application received",
      desc: "New succession mutation request submitted from Danapur",
      time: "3 hours ago",
      icon: UserPlus,
      color: "var(--primary-navy)"
    }
  ];

  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ background: 'var(--light-bg)', padding: '6px', borderRadius: '6px', color: item.color, flexShrink: 0 }}>
                <Icon size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--primary-navy)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {item.desc}
                </div>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {item.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityList;