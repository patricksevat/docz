import * as React from 'react'
import { SFC, ReactNode } from 'react'
import { useConfig } from 'docz'
import BaseTooltip from 'rc-tooltip'
import styled, { css } from 'react-emotion'

import { get } from '@utils/theme'

interface TooltipProps {
  text: ReactNode
  children: ReactNode
}

const overlayClass = (colors: Record<string, any>) => css`
  .rc-tooltip-inner {
    background: ${colors.tooltipBg};
    color: ${colors.tooltipColor};
  }

  .rc-tooltip-arrow {
    border-top-color: ${colors.tooltipBg};
  }
`

const Link = styled('a')`
  text-decoration: none;
  color: ${get('colors.primary')};
`

export const Tooltip: SFC<TooltipProps> = ({ text, children }) => {
  const { themeConfig } = useConfig()
  const className = overlayClass(themeConfig.colors)

  return (
    <BaseTooltip
      placement="top"
      trigger={['hover']}
      overlay={text}
      overlayClassName={className}
    >
      <Link href="#" onClick={(ev: any) => ev.preventDefault()}>
        {children}
      </Link>
    </BaseTooltip>
  )
}
