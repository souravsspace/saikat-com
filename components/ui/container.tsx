type Props = {
   children: React.ReactNode
}

export default function Container({ children }: Props) {
   return <div className="max-w-[1280px] mx-auto px-4 sm:px-8">{children}</div>
}
