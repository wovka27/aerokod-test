import React from 'react';

export type InjectedListItemProps<TItem> = {
  item?: TItem;
  index?: number;
};

type ListRendererProps<TItem, TChildProps extends object> = {
  items: TItem[];

  component: React.ComponentType<InjectedListItemProps<TItem> & TChildProps>;

  getKey: (item: TItem, index: number) => React.Key;

  extraProps?: (item: TItem) => TChildProps;
};

export function ListRenderer<TItem, TChildProps extends object = {}>({
  items,
  component: Component,
  getKey,
  extraProps,
}: ListRendererProps<TItem, TChildProps>) {
  return items.map((item, index) => {
    const injected: InjectedListItemProps<TItem> = { item, index };
    const childProps = extraProps?.(item) ?? ({} as TChildProps);

    return (
      <Component
        key={getKey(item, index)}
        {...injected}
        {...childProps}
      />
    );
  });
}
