import React from 'react'

import LinkButton from '@renderforest/rf-ui-library/molecules/LinkButton'

export const ToolsSiderBar = () => {
  return <div>
    <LinkButton
        title={'Button'}
        isIconLeft={false}
        color="secondarySemiDark"
        iconProps={{
            size: 'small',
            name: 'trim'
        }}
    >
        {'Button'}
    </LinkButton>
  </div>
}
