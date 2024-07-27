// project import
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import useAuth from 'contexts/useAuth';
// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  useAuth();
  return (
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Navigation />
        {/* <NavCard /> */}
      </SimpleBar>
    </>
  );
}
