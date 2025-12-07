// frontend/src/components/marketing/FeatureItem.tsx

interface TitleItemProps {
  bgColor: string;
  title: string;
  content: string;
}

export default function FeatureItem({ bgColor, title, content }: TitleItemProps) {
  return (
    <div className={`bg-gradient-to-r ${bgColor} flex flex-col h-full text-white text-center rounded-2xl p-4 md:p-8 lg:gap-10 shadow-white/20 shadow-xl`}>
        <h3 className="text-2xl md:text-3xl lg:text-4xl sm:mb-3 lg:mb-4 font-bold">{title}</h3>
        <p className="lg:text-xl lg:font-medium">{content}</p>
    </div>
  );
}