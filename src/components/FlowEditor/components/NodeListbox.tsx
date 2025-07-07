import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

function NodeListbox({
  value,
  setValue,
  buttonContent,
  children,
}: {
  value: string;
  setValue: (value: string) => void;
  buttonContent?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation("core.apiBuilder");

  return (
    <Listbox value={value} onChange={setValue}>
      <ListboxButton className="w-full border border-bg-200 dark:border-bg-800 component-bg-lighter rounded-md pr-2 h-10 pl-3 flex-between">
        <div className="w-full truncate text-left min-w-0">
          {!value ? (
            <span className="text-bg-400 dark:text-bg-600">
              {t("empty.pleaseSelect")}
            </span>
          ) : (
            buttonContent || <span>{value}</span>
          )}
        </div>
        <Icon
          icon="tabler:chevron-down"
          className="text-bg-400 dark:text-bg-600"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "min-w-(--button-width) rounded-lg border border-bg-200 dark:border-bg-700 bg-bg-100 dark:bg-bg-800 border shadow-custom p-1 [--anchor-gap:--spacing(2)] focus:outline-none",
          "transition duration-100 ease-in data-leave:data-closed:opacity-0"
        )}
      >
        {children}
      </ListboxOptions>
    </Listbox>
  );
}

export default NodeListbox;
