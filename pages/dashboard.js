import { useEffect } from 'react';
import Header from '../src/components/header';
import Sidebar from '../src/components/sidebar';
import Timeline from '../src/components/timeline';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Social-App';
  }, []);
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <Timeline />
      </div>
    </>
  );
};

export default Dashboard;
