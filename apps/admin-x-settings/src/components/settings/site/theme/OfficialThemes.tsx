import Heading from '../../../../admin-x-ds/global/Heading';
import MarketplaceBgImage from '../../../../assets/images/footer-marketplace-bg.png';
import ModalPage from '../../../../admin-x-ds/global/modal/ModalPage';
import React from 'react';
import {OfficialTheme, useOfficialThemes} from '../../../providers/ServiceProvider';
import {getGhostPaths} from '../../../../utils/helpers';

const OfficialThemes: React.FC<{
    onSelectTheme?: (theme: OfficialTheme) => void;
}> = ({
    onSelectTheme
}) => {
    const {adminRoot} = getGhostPaths();
    const officialThemes = useOfficialThemes();

    return (
        <ModalPage heading='Themes'>
            <div className='mt-[6vmin] grid grid-cols-1 gap-[6vmin] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                {officialThemes.map((theme) => {
                    return (
                        <button key={theme.name} className='flex cursor-pointer flex-col gap-3 text-left' type='button' onClick={() => {
                            onSelectTheme?.(theme);
                        }}>
                            {/* <img alt={theme.name} src={`${assetRoot}/${theme.image}`}/> */}
                            <div className='w-full bg-grey-100 shadow-md transition-all duration-500 hover:scale-[1.05]'>
                                <img
                                    alt={`${theme.name} Theme`}
                                    className='h-full w-full object-contain'
                                    src={`${adminRoot}${theme.image}`}
                                />
                            </div>
                            <div className='mt-3'>
                                <Heading level={4}>{theme.name}</Heading>
                                <span className='text-sm text-grey-700'>{theme.category}</span>
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className='mx-[-8vmin] mb-[-8vmin] mt-[8vmin] bg-black px-[8vmin] py-16 text-center text-lg text-white' style={
                {
                    background: `#15171a url(${MarketplaceBgImage}) 100% 100% / 35vw no-repeat`
                }
            }>
                Find and buy third-party, premium themes from independent developers in the <a className='inline-block font-semibold text-lime' href="https://ghost.org/themes/" rel="noopener noreferrer" target="_blank">Ghost Marketplace &rarr;</a>
            </div>
        </ModalPage>
    );
};

export default OfficialThemes;
