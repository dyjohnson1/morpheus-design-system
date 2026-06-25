import type { Meta, StoryObj } from "@storybook/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
} from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Overlay/Popover",
  component: Popover,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Popover>;

/* ── Default (bottom) ───────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>Open popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <p style={{ margin: 0 }}>Popover content goes here.</p>
      </PopoverContent>
    </Popover>
  ),
};

/* ── With arrow ─────────────────────────────────────────────────────────── */

export const WithArrow: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>With arrow</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <p style={{ margin: 0 }}>Content with an arrow pointing at the trigger.</p>
      </PopoverContent>
    </Popover>
  ),
};

/* ── With close button ──────────────────────────────────────────────────── */

export const WithClose: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>With close</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ margin: 0 }}>This popover has a close button.</p>
          <PopoverClose>
            <button>Dismiss</button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/* ── Sides ──────────────────────────────────────────────────────────────── */

export const Top: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>Top</button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <PopoverArrow />
        <p style={{ margin: 0 }}>Positioned on top.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const Right: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>Right</button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <PopoverArrow />
        <p style={{ margin: 0 }}>Positioned on right.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>Bottom</button>
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <PopoverArrow />
        <p style={{ margin: 0 }}>Positioned on bottom.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const Left: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>Left</button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <PopoverArrow />
        <p style={{ margin: 0 }}>Positioned on left.</p>
      </PopoverContent>
    </Popover>
  ),
};

/* ── Open (controlled) ──────────────────────────────────────────────────── */

export const Open: Story = {
  render: () => (
    <Popover open>
      <PopoverTrigger>
        <button>Always open</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <p style={{ margin: 0 }}>Controlled open state.</p>
      </PopoverContent>
    </Popover>
  ),
};

/* ── Rich content ───────────────────────────────────────────────────────── */

export const RichContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <button>Settings</button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Preferences</h4>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <input type="checkbox" />
            Enable notifications
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <input type="checkbox" />
            Dark mode
          </label>
          <PopoverClose>
            <button>Done</button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/* ── All states matrix ──────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 80,
        alignItems: "center",
        padding: 120,
      }}
    >
      {/* Sides */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Placement sides (controlled open)
        </p>
        <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
          <Popover open>
            <PopoverTrigger>
              <button>Top</button>
            </PopoverTrigger>
            <PopoverContent side="top">
              <PopoverArrow />
              <p style={{ margin: 0 }}>Top</p>
            </PopoverContent>
          </Popover>

          <Popover open>
            <PopoverTrigger>
              <button>Right</button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <PopoverArrow />
              <p style={{ margin: 0 }}>Right</p>
            </PopoverContent>
          </Popover>

          <Popover open>
            <PopoverTrigger>
              <button>Bottom</button>
            </PopoverTrigger>
            <PopoverContent side="bottom">
              <PopoverArrow />
              <p style={{ margin: 0 }}>Bottom</p>
            </PopoverContent>
          </Popover>

          <Popover open>
            <PopoverTrigger>
              <button>Left</button>
            </PopoverTrigger>
            <PopoverContent side="left">
              <PopoverArrow />
              <p style={{ margin: 0 }}>Left</p>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* With/without arrow */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Arrow variants
        </p>
        <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
          <Popover open>
            <PopoverTrigger>
              <button>With arrow</button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <p style={{ margin: 0 }}>Arrow present</p>
            </PopoverContent>
          </Popover>

          <Popover open>
            <PopoverTrigger>
              <button>No arrow</button>
            </PopoverTrigger>
            <PopoverContent>
              <p style={{ margin: 0 }}>No arrow</p>
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* With close */}
      <section>
        <p
          style={{
            color: "var(--morph-color-on-surface-muted)",
            fontSize: 12,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          With close button
        </p>
        <Popover open>
          <PopoverTrigger>
            <button>Dismissible</button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ margin: 0 }}>Content with dismiss action.</p>
              <PopoverClose>
                <button>Close</button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      </section>
    </div>
  ),
};
