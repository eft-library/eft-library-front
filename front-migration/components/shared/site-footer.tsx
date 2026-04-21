interface SiteFooterProps {
  title: string;
  description: string;
}

export function SiteFooter({ title, description }: SiteFooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-[#2a2d35]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:px-8 dark:text-gray-400">
        <p className="font-medium text-gray-900 dark:text-white">
          {title}
        </p>
        <p>{description}</p>
      </div>
    </footer>
  );
}
