import Step3 from './Step3';
import Step4 from './Step4';
import * as Link from '../../components/Link';

const propTypes = {
    /* Onyx Props */
    const downloadCodes = () => {
        const recoveryCodes = props.account.twoFactorAuthData.codes;
        const blob = new Blob([recoveryCodes.join('\n')], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recovery-codes.txt';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    };

    return (