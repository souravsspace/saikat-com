type Props = {
   title: string
   subtitle: string
}

export default function Heading({ title, subtitle }: Props) {
   return (
      <div>
         <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
         <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
   )
}
