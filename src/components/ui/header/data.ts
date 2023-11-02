
// Profile dropdown
interface ProfileType {
  href: string;
  title: string;
  subtitle: string;
  icon: any;
}
const profile: ProfileType[] = [
  {
    href: "/profile",
    title: "Мой профиль",
    subtitle: "Настройки профиля",
    icon: "/images/svgs/icon-account.svg",
  },
];

export { profile };
