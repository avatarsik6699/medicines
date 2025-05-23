import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";
import { Suspense, type FC } from "react";

type Props = {
  children: ReactNode;
};

const QueryStatusWrapper: FC<Props> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-red-500 mb-2">Ошибка: {error.message}</div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={resetErrorBoundary}
                aria-label="Попробовать снова"
              >
                Попробовать снова
              </button>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-32">
                <span
                  className="inline-block animate-spin w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full"
                  aria-label="Загрузка..."
                />
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryStatusWrapper;
