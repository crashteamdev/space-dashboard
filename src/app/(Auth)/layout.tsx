export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{
            background: "linear-gradient(45deg, rgb(6, 28, 61), rgb(13, 13, 13))",
            overflow: "hidden",
            height: "100vh"
        }}>
            <div className="relative overflow-y-scroll h-full flex flex-col items-center justify-between">
                {children}
                <footer className="text-white w-full mt-auto mx-auto max-w-screen-2xl">
                    <div className="pb-8 w-full">
                        <div className="w-full flex justify-between items-center">
                            <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
                                <li>
                                    <a href="https://marketdb.pro/privacy" className="text-gray-500 transition hover:opacity-75">
                                        Политика конфиденциальности
                                    </a>
                                </li>

                                <li>
                                <a href="https://marketdb.pro/policy" className="text-gray-500 transition hover:opacity-75">
                                    Политика возврата
                                </a>
                                </li>
                            </ul>

                            <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
                                <li>
                                    <a
                                        href="https://t.me/marketdbchat"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                                    >
                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.24003 13.2837L7.89266 18.1697C8.38966 18.1697 8.60491 17.9562 8.86303 17.6999L11.1932 15.473L16.0214 19.0089C16.9069 19.5024 17.5308 19.2425 17.7697 18.1942L20.9389 3.34373L20.9398 3.34285C21.2207 2.03385 20.4664 1.52198 19.6037 1.8431L0.974906 8.97523C-0.296469 9.46873 -0.277219 10.1775 0.758781 10.4986L5.52141 11.98L16.584 5.05786C17.1047 4.71311 17.578 4.90386 17.1887 5.24861L8.24003 13.2837Z" fill="white"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}