"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Home,
  Menu,
  MessageCircle,
  Plus,
  Search,
  Share,
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  Users,
  X,
} from "lucide-react";

type FeedItem = {
  id: number;
  type: "live" | "produto";
  nome: string;
  preco: string;
  precoOriginal?: string;
  desconto?: string;
  frete?: string;
  rating?: string;
  vendidos?: string;
  viewers?: string;
  seller?: string;
  cover: string;
  liveSeconds?: string;
  beneficioPrincipal?: string;
  beneficios?: string[];
};

type WelcomeOffer = {
  id: number;
  nome: string;
  preco: string;
  original: string;
  badge: string;
  image: string;
};

const benefitChips = ["Frete grátis", "Desconto de R$ 10", "25% OFF", "Entrega rápida"];

const welcomeOffers: WelcomeOffer[] = [
  {
    id: 1,
    nome: "Camiseta Dry Fit Premium",
    preco: "R$ 27,88",
    original: "R$ 69,90",
    badge: "-60%",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    nome: "Kit 3 Bermudas Confort",
    preco: "R$ 29,99",
    original: "R$ 134,50",
    badge: "-78%",
    image: "https://images.unsplash.com/photo-1506629905607-d9b1c4f4eb30?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    nome: "Camisa Polo Tech",
    preco: "R$ 33,74",
    original: "R$ 132,00",
    badge: "-74%",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    nome: "Regata Masculina Black",
    preco: "R$ 31,15",
    original: "R$ 59,90",
    badge: "Frete grátis",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
  },
];

const feedItems: FeedItem[] = [
  {
    id: 1,
    type: "live",
    nome: "Kit 3 Bermudas Masculinas Seda Gelada",
    preco: "R$ 74,06",
    precoOriginal: "R$ 159,90",
    desconto: "25% OFF",
    frete: "Frete grátis",
    rating: "4.5",
    vendidos: "19.2K vendidos",
    viewers: "212",
    seller: "Adna Leal",
    cover: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
    liveSeconds: "00:33",
    beneficioPrincipal: "Toque gelado + seca rápido",
    beneficios: ["Frete grátis", "Oferta relâmpago", "12% OFF"],
  },
  {
    id: 2,
    type: "produto",
    nome: "Regata Machão Oversized BLACK",
    preco: "R$ 31,15",
    precoOriginal: "R$ 59,90",
    frete: "Frete grátis",
    rating: "4.3",
    vendidos: "3371 vendidos",
    cover: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    beneficioPrincipal: "Modelagem oversized premium",
    beneficios: ["Frete grátis", "Tecido forte"],
  },
  {
    id: 3,
    type: "produto",
    nome: "Tênis Masculino Academia Esportivo",
    preco: "R$ 40,90",
    precoOriginal: "R$ 99,90",
    desconto: "30% OFF",
    frete: "Frete grátis",
    rating: "4.5",
    vendidos: "34.0K vendidos",
    cover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    beneficioPrincipal: "Leve e confortável o dia todo",
    beneficios: ["Frete grátis", "30% OFF"],
  },
  {
    id: 4,
    type: "live",
    nome: "Calça Jogger Unissex Premium Secagem Rápida",
    preco: "R$ 34,99",
    viewers: "15",
    seller: "Rodrigo Silva",
    cover: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    liveSeconds: "00:02",
    beneficioPrincipal: "Tecido premium + não amassa fácil",
    beneficios: ["Secagem rápida", "Oferta ao vivo"],
  },
  {
    id: 5,
    type: "produto",
    nome: "Máquina Kemei Acabamento Pro",
    preco: "R$ 27,72",
    precoOriginal: "R$ 60,00",
    desconto: "30% OFF",
    frete: "Frete grátis",
    rating: "4.7",
    vendidos: "62.7K vendidos",
    cover: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80",
    beneficioPrincipal: "Corte preciso em casa",
    beneficios: ["Frete grátis", "30% OFF"],
  },
  {
    id: 6,
    type: "produto",
    nome: "Kit 3 Regatas Oversized Machão",
    preco: "R$ 79,90",
    precoOriginal: "R$ 139,90",
    desconto: "12% OFF",
    rating: "4.3",
    vendidos: "1462 vendidos",
    cover: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
    beneficioPrincipal: "Mais estilo gastando menos",
    beneficios: ["Kit econômico", "12% OFF"],
  },
];

const categories = ["Todos", "Eletrônicos", "Beleza", "Casa e Mais", "Moda", "Kids"];

function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-[#f5f5f7] text-[#111111] shadow-[0_20px_60px_rgba(0,0,0,.12)]">
      {children}
    </div>
  );
}

function TopStoreBar() {
  return (
    <div className="sticky top-0 z-40 bg-white px-4 pb-3 pt-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3 overflow-x-auto [scrollbar-width:none]">
        <div className="flex items-center gap-5 whitespace-nowrap text-[18px] font-medium text-[#5b5b63]">
          <div className="flex items-center gap-1.5 text-black">
            <div className="leading-none text-[16px] font-black">LIVE</div>
          </div>
          <span className="opacity-35">ulo</span>
          <span>Novela</span>
          <span>Seguindo</span>
          <span className="relative font-black text-black">
            Loja
            <span className="absolute -bottom-3 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#161616]" />
          </span>
          <span>Para você</span>
        </div>
        <ShoppingCart className="h-7 w-7 shrink-0" />
      </div>

      <div className="flex items-center gap-2 rounded-[18px] border-[3px] border-[#151515] bg-white px-3 py-2.5">
        <Search className="h-6 w-6 shrink-0 text-[#2b2b2b]" />
        <input
          defaultValue="promoção relâmpago tudo por 10"
          className="min-w-0 flex-1 bg-transparent text-[18px] text-[#8c8c93] outline-none"
        />
        <button className="shrink-0 rounded-[14px] bg-[#111111] px-4 py-2.5 text-[17px] font-black text-white">
          Procurar
        </button>
      </div>
    </div>
  );
}

function CouponStrip() {
  const coupons = [
    ["Frete grátis", "Desconto de R$ 20,00"],
    ["R$ 10,00", "de desconto"],
    ["25%", "de desconto"],
    ["12%", "de desconto"],
  ] as const;

  return (
    <div className="px-4 pt-3">
      <div className="overflow-hidden rounded-[22px] bg-gradient-to-r from-[#ff5b8a] via-[#ff4778] to-[#ff3169] p-4 text-white">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-[18px] font-black">Cupons novos clientes</div>
          <button className="shrink-0 rounded-full bg-white px-4 py-2 text-[15px] font-black text-[#ff3169]">
            Resgatar tudo
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {coupons.map(([title, sub]) => (
            <div key={title} className="min-w-[120px] rounded-[14px] bg-white px-3 py-3 text-[#ff3169]">
              <div className={`text-[16px] font-black ${title === "Frete grátis" ? "text-[#0b8f89]" : ""}`}>
                {title}
              </div>
              <div
                className={`text-[12px] font-semibold ${
                  title === "Frete grátis" ? "text-[#0b8f89]" : "text-[#cc4c73]"
                }`}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WelcomeOfferRow() {
  return (
    <div className="px-4 pt-4">
      <div className="rounded-[22px] bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-[18px] font-black text-[#111]">Ofertas de boas-vindas</div>
          <div className="shrink-0 rounded-full bg-[#18c7c7] px-3 py-1 text-[13px] font-black text-white">
            Frete grátis
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {welcomeOffers.map((item) => (
            <div key={item.id}>
              <div className="relative aspect-[0.86] overflow-hidden rounded-[14px] bg-[#f3f3f6]">
                <img src={item.image} alt={item.nome} className="h-full w-full object-cover" />
                <div className="absolute left-1.5 top-1.5 rounded-full bg-[#ffe3ea] px-1.5 py-0.5 text-[11px] font-black text-[#ff5a87]">
                  {item.badge}
                </div>
              </div>
              <div className="mt-2 line-clamp-2 text-[12px] font-medium leading-tight text-[#202025]">
                {item.nome}
              </div>
              <div className="mt-1 text-[14px] font-black text-[#111]">{item.preco}</div>
              <div className="text-[12px] text-[#9a9aa3] line-through">{item.original}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryBar() {
  return (
    <div className="sticky top-[112px] z-30 mt-4 bg-[#f5f5f7] px-4 pb-3 pt-1">
      <div className="mb-3 flex gap-2 overflow-x-auto [scrollbar-width:none]">
        {benefitChips.map((chip, idx) => (
          <div
            key={chip}
            className={`whitespace-nowrap rounded-[10px] px-3 py-2 text-[13px] font-black ${
              idx === 0
                ? "bg-[#dbf4f0] text-[#0b8f89]"
                : idx === 1
                ? "bg-[#ffe4ec] text-[#dd3369]"
                : idx === 2
                ? "bg-[#ffe8ef] text-[#ef7294]"
                : "bg-[#ffd6e1] text-[#ff3f73]"
            }`}
          >
            {chip}
          </div>
        ))}
      </div>

      <div className="flex gap-6 overflow-x-auto text-[18px] [scrollbar-width:none]">
        {categories.map((category, idx) => (
          <div
            key={category}
            className={`relative whitespace-nowrap ${idx === 0 ? "font-black text-black" : "text-[#76767d]"}`}
          >
            {category}
            {idx === 0 ? <div className="absolute -bottom-3 left-0 h-1 w-full rounded-full bg-[#1a1a1a]" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ item, onOpen }: { item: FeedItem; onOpen: (item: FeedItem) => void }) {
  const isLive = item.type === "live";

  return (
    <div className="overflow-hidden rounded-[18px] bg-white shadow-sm">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="block w-full text-left"
        aria-label={isLive ? `Abrir live de ${item.nome}` : `Abrir produto ${item.nome}`}
      >
        <div className="relative aspect-[0.84] overflow-hidden bg-[#efeff3]">
          <img src={item.cover} alt={item.nome} className="h-full w-full object-cover" />

          {isLive ? (
            <>
              <div className="absolute left-3 top-3 flex items-center gap-1 rounded-[10px] bg-[#ff2f6e] px-2 py-1 text-white shadow-lg">
                <div className="text-[13px] font-black">▮▮</div>
                <Users className="h-3.5 w-3.5" />
                <div className="text-[12px] font-black">{item.viewers}</div>
              </div>

              <div className="absolute left-3 top-14 rounded-full bg-[#ffefef] px-2 py-1 text-[11px] font-black text-[#ff497e] shadow">
                🏷️ Ao vivo
              </div>

              {item.liveSeconds ? (
                <div className="absolute left-3 bottom-3 rounded-[10px] bg-black/65 px-2.5 py-1 text-[12px] font-black text-white">
                  ▌▌ {item.liveSeconds}
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </button>

      <div className="p-3">
        <div className="line-clamp-2 text-[14px] leading-snug text-[#202025]">{item.nome}</div>

        <div className="mt-2 flex items-end gap-1.5">
          <span className="text-[15px] font-black text-[#e23567]">{item.preco}</span>
          {item.precoOriginal ? (
            <span className="text-[12px] text-[#a0a0a9] line-through">{item.precoOriginal}</span>
          ) : null}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.desconto ? (
            <span className="rounded-[8px] bg-[#ffe4ec] px-2 py-1 text-[11px] font-black text-[#e73f74]">
              {item.desconto}
            </span>
          ) : null}
          {item.frete ? (
            <span className="rounded-[8px] bg-[#dcf5f0] px-2 py-1 text-[11px] font-black text-[#169a93]">
              {item.frete}
            </span>
          ) : null}
          {item.type === "live" ? (
            <span className="rounded-[8px] bg-[#fff0df] px-2 py-1 text-[11px] font-black text-[#f08a1c]">
              Oferta relâmpago
            </span>
          ) : null}
        </div>

        <div className="mt-2 flex items-center gap-1 text-[12px] text-[#8b8b93]">
          {item.rating ? (
            <>
              <Star className="h-3.5 w-3.5 fill-[#f5bf24] text-[#f5bf24]" />
              <span>{item.rating}</span>
            </>
          ) : null}
          {item.vendidos ? <span>{item.vendidos}</span> : null}
        </div>
      </div>
    </div>
  );
}

function BottomNav() {
  const navItems = [
    { icon: Home, label: "Início", active: true },
    { icon: Users, label: "Amigos", active: false },
    { icon: MessageCircle, label: "Mensagens", active: false },
    { icon: User, label: "Perfil", active: false },
  ] as const;

  return (
    <div className="fixed bottom-0 left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-[#e8e8ec] bg-white px-2 py-2">
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex flex-col items-center gap-0.5 text-[12px]">
            <Icon className={`h-6 w-6 ${item.active ? "text-black" : "text-[#8b8b93]"}`} />
            <span className={`${item.active ? "font-black text-black" : "text-[#8b8b93]"}`}>{item.label}</span>
          </div>
        );
      })}

      <div className="flex flex-col items-center">
        <div className="flex h-12 w-14 items-center justify-center rounded-[16px] bg-[#111] text-white shadow-lg ring-4 ring-white">
          <Plus className="h-7 w-7" />
        </div>
      </div>

      {navItems.slice(2).map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex flex-col items-center gap-0.5 text-[12px]">
            <Icon className={`h-6 w-6 ${item.active ? "text-black" : "text-[#8b8b93]"}`} />
            <span className={`${item.active ? "font-black text-black" : "text-[#8b8b93]"}`}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-28 right-4 z-30 flex flex-col gap-3">
      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,.15)]">
        <ChevronRight className="h-7 w-7 rotate-[-90deg]" />
      </button>
      <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,.15)]">
        <Menu className="h-7 w-7" />
      </button>
    </div>
  );
}

function LiveOverlay({ item, onClose }: { item: FeedItem; onClose: () => void }) {
  const socialStats = useMemo(
    () => [
      { icon: Heart, value: "7.216" },
      { icon: MessageCircle, value: "116" },
      { icon: ShoppingBag, value: "1.508" },
      { icon: Share, value: "2.389" },
    ],
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] bg-black"
    >
      <div className="relative mx-auto h-full max-w-md overflow-hidden bg-black text-white">
        <img src={item.cover} alt={item.nome} className="absolute inset-0 h-full w-full object-cover opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

        <button onClick={onClose} className="absolute left-4 top-4 z-20 text-white" aria-label="Voltar">
          <ArrowLeft className="h-9 w-9" />
        </button>

        <div className="absolute right-4 top-24 z-20 flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-1">
            <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
                alt="perfil"
                className="h-full w-full object-cover"
              />
            </div>
            <button className="-mt-3 rounded-full bg-[#ff2f6e] px-3 py-1 text-[13px] font-black">+ Seguir</button>
          </div>

          {socialStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.value} className="flex flex-col items-center gap-1 text-white drop-shadow-lg">
                <Icon className="h-9 w-9" />
                <div className="text-[14px] font-semibold">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="absolute left-4 right-4 top-5 z-20 flex items-center justify-between">
          <div className="rounded-full bg-black/40 px-3 py-2 text-[14px] font-black backdrop-blur">
            🔥 Classificação diária
          </div>
          <button onClick={onClose} className="rounded-full bg-black/35 p-2 backdrop-blur" aria-label="Fechar live">
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="absolute left-4 top-20 z-20 flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#ff2f6e]">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
              alt="perfil"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] font-black">{item.seller ?? "amanda_indica3"}</div>
            <div className="text-[14px] text-white/85">🤍 2.1K</div>
          </div>
        </div>

        <div className="absolute left-4 top-44 z-20 rounded-[6px] bg-black/75 px-3 py-2 text-[20px] font-black leading-tight">
          PROMOÇÃO
          <br />
          RELÂMPAGO ⚡😱
        </div>

        <div className="absolute left-4 top-[330px] z-20 rounded-[6px] bg-black/80 px-3 py-2 text-[18px] font-black leading-tight text-[#ffd54d]">
          DE: 100,00
          <br />
          POR: 25,00 😱
          <div className="mt-1 text-[16px] text-white">
            P: 36/38
            <br />
            M: 40/42
            <br />
            G: 44/46
            <br />
            GG: 48/50
          </div>
        </div>

        <div className="absolute bottom-44 left-4 right-4 z-20">
          <div className="mb-2 text-[14px] font-semibold drop-shadow">
            {item.seller ?? "amanda_indica3"} <span className="opacity-80">Host</span>
          </div>
          <div className="max-w-[85%] text-[17px] font-bold leading-tight drop-shadow">
            Fique e aproveite as melhores ofertas clicando na loja. Benefícios na tela, compra rápida e sem sair da
            live.
          </div>
        </div>

        <div className="absolute bottom-20 left-3 right-3 z-20 rounded-[22px] bg-white p-3 text-black shadow-[0_20px_50px_rgba(0,0,0,.35)]">
          <div className="flex gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-[16px] bg-[#f2f2f5]">
              <img src={item.cover} alt={item.nome} className="h-full w-full object-cover" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="line-clamp-1 text-[17px] font-black">{item.nome}</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <span className="rounded-[8px] bg-[#fff0df] px-2 py-1 text-[11px] font-black text-[#f08a1c]">
                  ⚡ Oferta Relâmpago
                </span>
                <span className="rounded-[8px] bg-[#ffe4ec] px-2 py-1 text-[11px] font-black text-[#e73f74]">
                  🎟️ 12% OFF
                </span>
                <span className="rounded-[8px] bg-[#dcf5f0] px-2 py-1 text-[11px] font-black text-[#169a93]">
                  🚚 Frete grátis
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[13px] text-[#87878f]">
                <Star className="h-3.5 w-3.5 fill-[#f5bf24] text-[#f5bf24]" />
                <span>4.6</span>
                <span>995 vendidos</span>
              </div>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div>
                  <div className="text-[14px] text-[#9d9da5] line-through">R$ 79,00</div>
                  <div className="text-[18px] font-black text-[#111]">
                    R$ 24,99 <span className="text-[14px] text-[#e23567]">(-68%)</span>
                  </div>
                </div>
                <button className="rounded-full bg-[#ff2f6e] px-5 py-3 text-[18px] font-black text-white shadow-lg">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center gap-2">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#ff8a00] shadow-lg">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <div className="flex-1 rounded-full bg-white/15 px-4 py-3 text-[16px] text-white/75 backdrop-blur">
            Adicionar comentário...
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <SmileIcon />
          </button>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <AtIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SmileIcon() {
  return <div className="text-[22px]">☺️</div>;
}

function AtIcon() {
  return <div className="text-[22px] font-black">@</div>;
}

export default function HomePage() {
  const [selectedLive, setSelectedLive] = useState<FeedItem | null>(null);

  return (
    <>
      <MobileShell>
        <TopStoreBar />
        <CouponStrip />
        <WelcomeOfferRow />
        <CategoryBar />

        <div className="grid grid-cols-2 gap-3 px-4 pb-28 pt-2">
          {feedItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onOpen={(clicked) => {
                if (clicked.type === "live") {
                  setSelectedLive(clicked);
                }
              }}
            />
          ))}
        </div>

        <FloatingActions />
        <BottomNav />
      </MobileShell>

      <AnimatePresence>
        {selectedLive ? <LiveOverlay item={selectedLive} onClose={() => setSelectedLive(null)} /> : null}
      </AnimatePresence>
    </>
  );
}
