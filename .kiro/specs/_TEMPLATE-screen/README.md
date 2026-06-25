# Screen Spec Template

Copy this folder to `.kiro/specs/<screen-name>/` and fill in the blanks to have Kiro
assemble a screen from existing Morpheus components. Delete the `_TEMPLATE-screen`
prefix so it doesn't run by accident. One screen per spec.

Rule of thumb: a screen spec COMPOSES components — it should not define new tokens or
one-off styles. If you find yourself needing a new primitive, build it in `p0-components`
first, then compose it here.
