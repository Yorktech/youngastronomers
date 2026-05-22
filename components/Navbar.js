import { getSectionPages } from '@/lib/content';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
    const societiesPages = getSectionPages('societies');
    const sciencePages = getSectionPages('science');

    return <NavbarClient societiesPages={societiesPages} sciencePages={sciencePages} />;
}
