// frontend/src/components/landing/TitleItem.tsx

interface TitleItemProps {
  children: React.ReactNode; // Pour accepter des enfants
  className?: string;
  text?: string;
}

export default function TitleItem({ children, className, text }: TitleItemProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-4xl mb-4 lg:mb-5 md:text-5xl font-extrabold leading-10 md:leading-14 tracking-tight">
        {children}
      </h2>
      <p className={`${className} text-lg md:text-xl`}>{text}</p>
    </div>
  );
}
