import Navbar from '../navbar/Navbar';

export default function SiteLayout({ children }) {
    return (
        <div className="w-full min-w-[350px] 2xl bg-gray-50">
            <Navbar></Navbar>
            <div className="max-w-[1536px] mx-auto">{children}</div>
        </div>
    );
}
