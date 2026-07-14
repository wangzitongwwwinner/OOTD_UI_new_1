import React, { useState } from "react";
import { User } from "../types";

interface WeChatLoginProps {
  onLoginSuccess: (user: User) => void;
  initialUser: User;
}

export default function WeChatLogin({ onLoginSuccess, initialUser }: WeChatLoginProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  const handleLoginClick = (e: React.MouseEvent, type: "wechat" | "phone_submit") => {
    if (!isChecked) {
      e.preventDefault();
      // Trigger checkbox shake animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (type === "wechat") {
      // Simulate direct WeChat OAuth session callback
      onLoginSuccess({
        ...initialUser,
        isLoggedIn: true,
      });
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    if (phoneNumber && smsCode) {
      onLoginSuccess({
        ...initialUser,
        nickname: `手机用户_${phoneNumber.slice(-4)}`,
        isLoggedIn: true,
      });
    }
  };

  const sendSms = () => {
    if (!phoneNumber) return;
    setIsSendingSms(true);
    setTimeout(() => {
      setIsSendingSms(false);
      setSmsSent(true);
    }, 1000);
  };

  return (
    <div id="login_screen" className="relative h-screen max-w-md mx-auto overflow-hidden font-sans antialiased shadow-2xl bg-[#181512]">
      {/* Immersive Wardrobe Backdrop */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full transform scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAB15KgcuodUGqDQ15zgslGtuMB-LeB2iYEueGjFWtoE2BeVWby0NlWwHieINcS-9fvC7q-Ooh2SuTP28AnRMBmB2h8PJsjOsW4I-6zfeUjcveB2zs4jr1cqiRPhLifCD_qrFy76sFzFdtP3tCyzxL_0l9iG_jg0vBX2QAupOwlPiIA_Dw_FZFXlCOH7gkgjVAmE80uCgz143g6Z65AX5unSTuwF9m-j4IDaHpDMnuBeQmapeixqAlCZA')`,
          }}
        />
        {/* Scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#181512]/60 via-[#181512]/30 to-[#181512]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181512]/95 to-transparent h-1/2 bottom-0 mt-auto" />
      </div>

      {/* Login Portal Main Body */}
      <main className="relative z-10 h-full w-full flex flex-col justify-between px-6 py-12 md:py-16">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mt-12 md:mt-24 text-center">
          <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-6 overflow-hidden bg-white/5 shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida/AP1WRLuBsqWFJoZThX1yv_1LhttdSc2RnMEplVcXU9MN14ak2wbscabFsVcMxPQlXDYAAayEaPeL7_Dd_3BzsM0wMkBt9qQhAjXop7nCfYnMFqF92cknDgETUe3fZFYEqRZ0XRgI74jZyg1j693WJrxUViQQauXaebx7UiArrTMB7lJ8ezrJgPr3_TTTKNyWeJVa-Fzfj2bic4clpFhnc2880I8lE1gkUPciOelCU54SCUOGI1BbnbYXMbjAgz4"
              alt="Brand Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-2 tracking-tight drop-shadow-sm font-semibold">
            今天穿什么
          </h1>
          <p className="font-sans text-sm md:text-base text-white/80 max-w-[280px] font-light leading-relaxed">
            让每一天的穿衣决策，都成为一种享受。
          </p>
        </div>

        {/* Action Controls & Footer */}
        <div className="w-full pb-8 md:pb-12">
          {/* WeChat Login Action Button */}
          <button
            id="wechat_login_btn"
            onClick={(e) => handleLoginClick(e, "wechat")}
            className="w-full bg-[#07C160] hover:bg-[#06ad56] text-white rounded-full py-4 flex items-center justify-center space-x-2 transition-all active:scale-98 shadow-lg shadow-[#07C160]/20 mb-4 relative overflow-hidden group cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              chat
            </span>
            <span className="font-medium text-base tracking-wide font-sans">微信一键登录</span>
          </button>

          {/* Alternative Phone Login Button */}
          <button
            id="phone_login_trigger"
            onClick={() => setShowPhoneModal(true)}
            className="w-full glass-panel text-white rounded-full py-4 font-sans text-sm tracking-wide transition-all hover:bg-white/20 active:scale-98 mb-8 cursor-pointer"
          >
            手机号登录 / 注册
          </button>

          {/* Agreement Checkbox Segment */}
          <div
            id="agreement_terms"
            className={`flex items-start justify-center space-x-2 px-4 transition-all duration-300 ${
              isShaking ? "animate-[bounce_0.4s_ease-in-out_infinite] text-red-400" : ""
            }`}
          >
            <div className="relative flex items-center mt-1">
              <input
                id="terms_checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 rounded-sm border-white/40 bg-transparent text-[#181512] transition-all cursor-pointer accent-white focus:ring-0 focus:ring-offset-0 appearance-none border checked:bg-white checked:border-white"
              />
              {isChecked && (
                <span className="material-symbols-outlined absolute inset-0 text-xs text-[#181512] font-bold pointer-events-none flex items-center justify-center">
                  check
                </span>
              )}
            </div>
            <label
              htmlFor="terms_checkbox"
              className={`font-sans text-xs leading-tight cursor-pointer text-center select-none ${
                isShaking ? "text-red-300 font-semibold" : "text-white/60"
              }`}
            >
              已阅读并同意{" "}
              <a href="#" onClick={(e) => e.stopPropagation()} className="text-white hover:underline underline-offset-2">
                《用户协议》
              </a>{" "}
              和{" "}
              <a href="#" onClick={(e) => e.stopPropagation()} className="text-white hover:underline underline-offset-2">
                《隐私政策》
              </a>
            </label>
          </div>
        </div>
      </main>

      {/* Beautiful Modal for Phone OTP Login */}
      {showPhoneModal && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-end justify-center md:items-center">
          <div className="w-full md:max-w-md bg-[#faf9f7] rounded-t-3xl md:rounded-3xl p-6 shadow-2xl flex flex-col space-y-6 animate-[slideUp_0.3s_ease-out_forwards]">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <h3 className="font-serif text-lg font-bold text-gray-900">手机号安全登录</h3>
              <button
                id="close_phone_modal"
                onClick={() => setShowPhoneModal(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handlePhoneSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider">手机号码</label>
                <div className="flex space-x-2">
                  <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-600 font-medium">
                    +86
                  </div>
                  <input
                    id="phone_input"
                    type="tel"
                    placeholder="请输入11位中国大陆手机号"
                    maxLength={11}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#181512] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider">短信验证码</label>
                <div className="flex space-x-2">
                  <input
                    id="sms_code_input"
                    type="text"
                    placeholder="6位数字验证码"
                    maxLength={6}
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#181512] transition-all"
                  />
                  <button
                    id="send_sms_btn"
                    type="button"
                    disabled={phoneNumber.length !== 11 || isSendingSms}
                    onClick={sendSms}
                    className="bg-[#181512] text-white disabled:bg-gray-300 disabled:text-gray-500 text-xs font-semibold px-4 rounded-lg transition-all active:scale-95 cursor-pointer"
                  >
                    {isSendingSms ? "发送中..." : smsSent ? "重新发送" : "获取验证码"}
                  </button>
                </div>
              </div>

              <button
                id="phone_login_submit"
                type="submit"
                onClick={(e) => handleLoginClick(e, "phone_submit")}
                disabled={phoneNumber.length !== 11 || smsCode.length !== 6}
                className="w-full bg-[#181512] text-white disabled:bg-gray-300 disabled:text-gray-500 rounded-full py-4 text-sm font-semibold tracking-wide transition-all active:scale-95 shadow-lg shadow-black/10 cursor-pointer mt-2"
              >
                确认登录
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
