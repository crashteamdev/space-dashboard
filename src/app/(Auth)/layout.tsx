export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{
            background: "linear-gradient(45deg, rgb(6, 28, 61), rgb(13, 13, 13))",
        }}>
            {children}
        </div>
    )
}