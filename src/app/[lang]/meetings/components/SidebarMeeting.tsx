import { RootState } from "@/redux";
import { useSelector } from "react-redux";

const SidebarMeeting = ({fullName}: any) => {
  const { accountInfo } = useSelector((state: RootState) => state.auth);

    return (
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Participants</h2>
        {/* Add participants list here */}
        <div className="mb-4">
          {
            accountInfo && (
            <p>{`${accountInfo.firstName} ${accountInfo.lastName}`}</p>
            )
          }
          {fullName && (
            <p>{fullName}</p>
          )}
        </div>
        {/* <h2 className="font-bold mb-4">Scre</h2> */}
        {/* Add chat component here */}
      </aside>
    );
  }
  
  export default SidebarMeeting;
  