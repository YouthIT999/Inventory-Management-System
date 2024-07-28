import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import userImg from "../assets/profile.jpg"
import { HiOutlineCloud } from "react-icons/hi2";

export const SideBar = () => {
  return (
    <Sidebar aria-label="Sidebar with content separator example" className="flex flex-col h-full">
      <Sidebar.Items className="flex-grow">
        <Sidebar.ItemGroup className="">
          <Sidebar.Item className="m-5 mr-10" href="/" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item className="m-5" href="/product" icon={HiShoppingBag}>
            Product
          </Sidebar.Item>
          <Sidebar.Item className="m-5" href="/sales" icon={HiInbox}>
            Sales
          </Sidebar.Item>
          <Sidebar.Item className="m-5" href="/weeklyLog" icon={HiUser}>
            Weekly log
          </Sidebar.Item>
          <Sidebar.Item className="m-5" href="/monthlyLog" icon={HiShoppingBag}>
            Monthly log
          </Sidebar.Item>
          <Sidebar.Item className="m-5" href="/logout" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.Logo className="mt-60 p-5" href="#" img={userImg} imgAlt="Profile">
        <p className="ml-4">Username</p>
      </Sidebar.Logo>
    </Sidebar>
  );
};

export default SideBar;
