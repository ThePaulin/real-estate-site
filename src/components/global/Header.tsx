import Image from 'next/image'
import Logo from '../../assets/Logo.png'
import Button from '../elements/Button'
import { IMenuLink } from '@/types'
import { useWindowSize } from 'usehooks-ts'

import Text from '../elements/Text'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { IconMenu, IconSearch } from '../elements'
import { useDrawer } from './Drawer'
import MenuDrawer from './MenuDrawer'
// import Router, { withRouter } from 'next/router';

function Header () {
  const { closeDrawer, openDrawer } = useDrawer()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
		<nav className="flex justify-between px-4 py-10  ">
			<div className="flex justify-start translate-x-10">
				<Button as={'a'} variant="link" href="/">
					<Image src={Logo} alt="Cribs KGL logo" />
				</Button>
			</div>
			<div className="flex  tablet:gap-4">
				<Button variant="inline" aria-label="search">
					<IconSearch />
				</Button>
				<Button
					variant="inline"
					aria-label="menu"
					onClick={() => { openDrawer(setIsMenuOpen) }}
				>
					<IconMenu />
				</Button>
				<MenuDrawer
					open={isMenuOpen}
					onClose={() => { closeDrawer(setIsMenuOpen) }}
				/>
			</div>
		</nav>
  )
}

export default Header
