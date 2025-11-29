// frontend/src/components/marketing/TitleBody.tsx

interface TitleBodyProps {
  children: React.ReactNode; // Pour accepter des enfants
  text: string;
}

export default function TitleBody({
  children,
  text,
}: TitleBodyProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl md:text-5xl font-bold leading-10 md:leading-14 tracking-tight">
        {children}
      </h2>
      <p className="sm:text-xl">{text}</p>
    </div>
  );
}
