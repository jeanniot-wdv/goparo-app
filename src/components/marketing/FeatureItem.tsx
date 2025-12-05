// frontend/src/components/marketing/FeatureItem.tsx

interface TitleItemProps {
  bgColor: string;
  title: string;
  content: string;
}

export default function FeatureItem({ bgColor, title, content }: TitleItemProps) {
  return (
    <div className={`bg-linear-to-r from-${bgColor}-500 to-${bgColor}-600 flex flex-col h-full text-white text-center rounded-2xl p-6 md:p-8 lg:gap-10 shadow-xl`}>
        <h3 className="text-3xl md:text-3xl lg:text-4xl mb-3 lg:mb-4 font-bold">{title}</h3>
        <p className="lg:text-xl lg:font-medium">{content}</p>
    </div>
  );
}