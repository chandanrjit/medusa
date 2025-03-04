import { ArrowUpRightOnBox, ShoppingBag } from "@medusajs/icons"
import { Container, Heading, Text } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { Link, useLoaderData } from "react-router-dom"

import { useStockLocations } from "../../../hooks/api/stock-locations"
import LocationListItem from "./components/location-list-item/location-list-item"
import { LOCATION_LIST_FIELDS } from "./constants"
import { shippingListLoader } from "./loader"

import { ReactNode } from "react"
import { IconAvatar } from "../../../components/common/icon-avatar"
import { TwoColumnPage } from "../../../components/layout/pages"
import { useDashboardExtension } from "../../../extensions"
import { LocationListHeader } from "./components/location-list-header"

export function LocationList() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof shippingListLoader>
  >

  const {
    stock_locations: stockLocations = [],
    isError,
    error,
  } = useStockLocations(
    {
      fields: LOCATION_LIST_FIELDS,
    },
    { initialData }
  )

  const { getWidgets } = useDashboardExtension()

  if (isError) {
    throw error
  }

  return (
    <TwoColumnPage
      widgets={{
        after: getWidgets("location.details.after"),
        before: getWidgets("location.details.before"),
        sideAfter: getWidgets("location.details.side.after"),
        sideBefore: getWidgets("location.details.side.before"),
      }}
      showJSON
    >
      <TwoColumnPage.Main>
        <LocationListHeader />
        <div className="flex flex-col gap-3 lg:col-span-2">
          {stockLocations.map((location) => (
            <LocationListItem key={location.id} location={location} />
          ))}
        </div>
      </TwoColumnPage.Main>
      <TwoColumnPage.Sidebar>
        <LinksSection />
      </TwoColumnPage.Sidebar>
    </TwoColumnPage>
  )
}

interface SidebarLinkProps {
  to: string
  labelKey: string
  descriptionKey: string
  icon: ReactNode
}

const SidebarLink = ({
  to,
  labelKey,
  descriptionKey,
  icon,
}: SidebarLinkProps) => {
  return (
    <Link to={to} className="group outline-none">
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="shadow-elevation-card-rest bg-ui-bg-component transition-fg hover:bg-ui-bg-component-hover active:bg-ui-bg-component-pressed group-focus-visible:shadow-borders-interactive-with-active rounded-md px-4 py-2">
          <div className="flex items-center gap-4">
            <IconAvatar>{icon}</IconAvatar>
            <div className="flex flex-1 flex-col">
              <Text size="small" leading="compact" weight="plus">
                {labelKey}
              </Text>
              <Text
                size="small"
                leading="compact"
                className="text-ui-fg-subtle"
              >
                {descriptionKey}
              </Text>
            </div>
            <div className="flex size-7 items-center justify-center">
              <ArrowUpRightOnBox className="text-ui-fg-muted" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const LinksSection = () => {
  const { t } = useTranslation()

  return (
    <Container className="p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("stockLocations.sidebar.header")}</Heading>
      </div>

      <SidebarLink
        to="/settings/locations/shipping-profiles"
        labelKey={t("stockLocations.sidebar.shippingProfiles.label")}
        descriptionKey={t(
          "stockLocations.sidebar.shippingProfiles.description"
        )}
        icon={<ShoppingBag />}
      />
    </Container>
  )
}
