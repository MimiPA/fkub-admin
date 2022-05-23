import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from "react";

export default function NavLink({ icon, title, hide, item, href, setOpen = () => { } }) {
  const router = useRouter();
  const active = router.asPath === href;
  if (item && item.length > 0) {
    return (
      <SidebarDropdown
        icon={icon}
        title={title}
        hide={hide}
        item={item}
        setOpen={setOpen}
      />
    );
  }
  const body = (
    <div
      className={`px-6 flex py-4  ${hide ? "md:w-[70px]" : "md:w-full"} transition-all duration-200 ease-in-out cursor-pointer
      ${active ? "border-l-[5px] border-primary text-primary " : ""}`}
    >
      {icon && (
        <Image
          src={`${icon}${active ? "-active" : ""}.svg`}
          alt="icon Image"
          width="20"
          height="20"
        />
      )}
      {!hide && <span className="ml-2 text-sm">{title}</span>}
    </div>
  );

  if (!hide) {
    return <Link href={href}>
      <a>{body}</a>
    </Link>;
  }

  return (
    <div className="test" onClick={() => setOpen(true)}>
      {body}
    </div>
  );
}

const SidebarDropdown = ({
  icon,
  title,
  hide,
  item,
  setOpen: setHide,
  main,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const active = item.filter((i) => i.href === router.asPath)[0];

  return (
    <>
      <div className={`px-6 flex justify-between py-4  ${hide ? "md:w-[70px]" : "md:w-full"} cursor-pointer
        ${active && "border-l-[5px] border-primary text-primary"}`}
        onClick={() => {
          if (hide) {
            setHide(true);
          } else {
            setOpen(!open);
          }
        }}
      >
        <div className="flex justify-center">
          {icon && (
            <Image
              src={`${icon}${active ? "-active" : ""}.svg`}
              alt="icon Image"
              width="20"
              height="20"
            />
          )}
          {!hide && <span className="ml-2 text-sm">{title}</span>}
        </div>

        <div className={`flex justify-center ${hide && "hidden"} transition-transform duration-200
        ${open && "transform -rotate-90"}`}>
          <Image
            src="/icons/arrow_drop_down.svg"
            alt="arrow dropdown Image"
            width="20"
            height="20"
          />
        </div>
      </div>

      <div className={`pl-8 ${!open ? "max-h-0" : `max-h-96`} h-auto overflow-hidden transition-all duration-200 ease-in-out`} >
        {!hide &&
          item.map(({ icon, title, item, href, active }) => (
            <NavLink
              icon={icon}
              title={title}
              key={title}
              hide={hide}
              item={item}
              href={href}
              active={active}
            />
          ))}
      </div>
    </>
  );
};