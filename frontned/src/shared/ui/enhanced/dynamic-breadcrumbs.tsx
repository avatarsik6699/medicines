import { useMatches, Link } from "@tanstack/react-router";
import type { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/ui/breadcrumb";
import { DEFAULT_LIMIT } from "@shared/constants";

const routeLabels: Record<string, string> = {
  "/": "Главная",
  "/create-product": "Создание товара",
  "/update-product/$productId": "Редактирование товара",
  "/$productId": "Просмотр товара",
};

type RouteId = keyof typeof routeLabels;

export const DynamicBreadcrumbs: FC = () => {
  const matches = useMatches();

  // Фильтруем и преобразуем маршруты в хлебные крошки
  const breadcrumbs = matches
    .filter((match) => match.routeId !== "__root__") // Исключаем корневой маршрут
    .map((match, index, array) => {
      const isLast = index === array.length - 1;

      // Получаем метку для текущего маршрута
      let label = routeLabels[match.routeId as RouteId] || match.routeId;

      // Если в маршруте есть параметры (например, productId), заменяем их значениями
      if (match.params && Object.keys(match.params).length > 0) {
        Object.entries(match.params).forEach(([key, value]) => {
          label = label.replace(`$${key}`, String(value));
        });
      }

      return (
        <BreadcrumbItem key={match.routeId}>
          {isLast ? (
            <BreadcrumbPage>{label}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link
                to={match.routeId as RouteId}
                search={() =>
                  match.routeId === "/" ? { page: 1, limit: DEFAULT_LIMIT } : {}
                }
                params={match.params}
              >
                {label}
              </Link>
            </BreadcrumbLink>
          )}
          {!isLast && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      );
    });

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  );
};
